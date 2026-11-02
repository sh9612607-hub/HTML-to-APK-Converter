import express from 'express';
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import forge from 'node-forge';
import { signApk } from 'apk_sign_ts';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// High body limits for custom web assets / images
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));

// Cached 25-year Self-Signed Keystore for instant high-speed compilation
let cachedCertPem: string | null = null;
let cachedPkcs8PrivKeyPem: string | null = null;

function getSigningCredentials(): { certPem: string; pkcs8PrivKeyPem: string } {
  if (cachedCertPem && cachedPkcs8PrivKeyPem) {
    return { certPem: cachedCertPem, pkcs8PrivKeyPem: cachedPkcs8PrivKeyPem };
  }

  const forgeKeys = forge.pki.rsa.generateKeyPair(2048);
  const cert = forge.pki.createCertificate();
  cert.publicKey = forgeKeys.publicKey;
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 25);

  const attrs = [
    { name: 'commonName', value: 'Web2App Studio Universal Key' },
    { name: 'organizationName', value: 'Web2App Studio' },
    { name: 'countryName', value: 'US' }
  ];
  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.sign(forgeKeys.privateKey, forge.md.sha256.create());

  const certPem = forge.pki.certificateToPem(cert);
  const pkcs8PrivKeyPem = forge.pki.privateKeyInfoToPem(
    forge.pki.wrapRsaPrivateKey(forge.pki.privateKeyToAsn1(forgeKeys.privateKey))
  );

  cachedCertPem = certPem;
  cachedPkcs8PrivKeyPem = pkcs8PrivKeyPem;

  return { certPem, pkcs8PrivKeyPem };
}

// API Health / Status Endpoint
app.get('/api/apk-compiler-status', (_req, res) => {
  const baseApkPath = path.join(process.cwd(), 'server', 'assets', 'base-shell.apk');
  const baseExists = fs.existsSync(baseApkPath);
  res.json({
    status: baseExists ? 'ready' : 'degraded',
    engine: 'Chromium Android WebView Shell',
    signing: ['v1_jar_signature', 'v2_apk_signature_scheme', 'v3_apk_signature_scheme'],
    architecture: 'Universal (ARM64-v8a, ARMeabi-v7a, x86_64, x86)',
    androidSupport: 'Android 5.0 (API 21) - Android 15/16 (API 35+)',
    baseApkAvailable: baseExists
  });
});

// API Direct APK Build Endpoint
app.post('/api/build-apk', async (req, res) => {
  try {
    const {
      appName = 'MyMobileApp',
      packageName = 'com.myapp.web',
      versionName = '1.0.0',
      url = '',
      html = '',
      css = '',
      js = '',
      files = [],
      themeColor = '#10b981',
      orientation = 'portrait',
      enableVibration = true,
      enableFileChooser = true,
      enableDownloadManager = true,
      splashTitle = 'MyMobileApp',
      splashBgColor = '#0f172a'
    } = req.body;

    const baseApkPath = path.join(process.cwd(), 'server', 'assets', 'base-shell.apk');
    if (!fs.existsSync(baseApkPath)) {
      res.status(500).json({ error: 'Base APK shell is missing on server.' });
      return;
    }

    const baseApkData = fs.readFileSync(baseApkPath);
    const zip = await JSZip.loadAsync(baseApkData);

    // Prepare full compiled HTML content
    let finalHtml = html;
    if (!finalHtml || finalHtml.trim() === '') {
      if (url && url.trim() !== '') {
        finalHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${appName}</title>
    <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: ${splashBgColor}; }
        iframe { width: 100%; height: 100%; border: none; }
    </style>
</head>
<body>
    <iframe src="${url}" allow="geolocation; microphone; camera"></iframe>
</body>
</html>`;
      } else {
        finalHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${appName}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: ${splashBgColor}; color: #f8fafc; text-align: center; padding: 40px 20px; }
        .card { background: rgba(255,255,255,0.06); border-radius: 16px; padding: 30px; max-width: 420px; margin: 40px auto; border: 1px solid rgba(255,255,255,0.1); }
        h1 { color: ${themeColor}; margin-bottom: 8px; }
        .btn { display: inline-block; background: ${themeColor}; color: #000; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="card">
        <h1>${appName}</h1>
        <p>Built with Web2App Studio</p>
        <button class="btn" onclick="if(window.AndroidBridge) AndroidBridge.showToast('Welcome to ${appName}!'); else alert('Welcome!');">Test Bridge</button>
    </div>
</body>
</html>`;
      }
    }

    // Inject Native AndroidBridge Polyfill script inside HTML
    const bridgePolyfill = `
<script id="android-bridge-runtime">
(function() {
    window.AndroidBridge = window.AndroidBridge || {
        showToast: function(msg) {
            console.log('[AndroidBridge] Toast: ' + msg);
            try {
                var el = document.getElementById('__apk_toast');
                if(!el) {
                    el = document.createElement('div');
                    el.id = '__apk_toast';
                    el.style.cssText = 'position:fixed;bottom:60px;left:50%;transform:translateX(-50%);background:#1e293b;color:#f8fafc;padding:10px 20px;border-radius:24px;font-size:14px;z-index:999999;box-shadow:0 8px 24px rgba(0,0,0,0.5);border:1px solid #334155;pointer-events:none;';
                    document.body.appendChild(el);
                }
                el.innerText = msg;
                el.style.display = 'block';
                setTimeout(function(){ if(el) el.style.display = 'none'; }, 2500);
            } catch(e){}
        },
        vibrate: function(ms) {
            try { if (navigator.vibrate) navigator.vibrate(ms || 100); } catch(e){}
        },
        getAppVersion: function() { return "${versionName}"; },
        getPackageName: function() { return "${packageName}"; },
        getAppName: function() { return "${appName}"; },
        openUrl: function(targetUrl) { window.open(targetUrl, '_blank'); },
        exitApp: function() { if (confirm("Exit ${appName}?")) window.close(); }
    };
})();
</script>
`;

    if (finalHtml.includes('</body>')) {
      finalHtml = finalHtml.replace('</body>', `${bridgePolyfill}\n</body>`);
    } else {
      finalHtml = finalHtml + bridgePolyfill;
    }

    // Embed extra CSS & JS if provided separately
    if (css && css.trim() !== '' && !finalHtml.includes(css)) {
      finalHtml = finalHtml.replace('</head>', `<style>${css}</style>\n</head>`);
    }
    if (js && js.trim() !== '' && !finalHtml.includes(js)) {
      finalHtml = finalHtml.replace('</body>', `<script>${js}</script>\n</body>`);
    }

    // Write HTML to local sites
    zip.file('assets/local/index.html', finalHtml);
    zip.file('assets/demo/index.html', finalHtml);
    zip.file('assets/web/index.html', finalHtml);

    // If files are uploaded (images, sub-pages, icons)
    if (Array.isArray(files) && files.length > 0) {
      for (const f of files) {
        if (f.name && f.content) {
          const cleanName = f.name.replace(/^[/\\]+/, '');
          zip.file(`assets/local/${cleanName}`, f.content, { base64: Boolean(f.isBase64) });
          zip.file(`assets/web/${cleanName}`, f.content, { base64: Boolean(f.isBase64) });
        }
      }
    }

    // Configure runtime app settings
    const settings = {
      sites: [
        {
          url: url && url.startsWith('http') ? url : 'https://appassets.androidplatform.net/assets/local/index.html',
          title: appName
        }
      ],
      other: url && url.startsWith('http') ? url : 'https://appassets.androidplatform.net/assets/local/index.html',
      match: [],
      skip: [],
      remote_debug: true,
      console_log: true,
      js_interface: true,
      context_menu: true,
      local_sites: true,
      web_settings: {
        JavaScriptEnabled: true,
        DomStorageEnabled: true,
        AllowFileAccess: true,
        AllowContentAccess: true,
        LoadWithOverviewMode: true,
        UseWideViewPort: true,
        SupportZoom: true,
        BuiltInZoomControls: false
      },
      app_info: {
        name: appName,
        package: packageName,
        version: versionName,
        theme_color: themeColor,
        orientation: orientation,
        vibration: enableVibration,
        file_chooser: enableFileChooser,
        download_manager: enableDownloadManager,
        splash: {
          title: splashTitle,
          bg_color: splashBgColor
        }
      },
      source: 'assets',
      timestamp: new Date().toISOString()
    };

    zip.file('assets/settings.json', JSON.stringify(settings, null, 2));

    // Remove obsolete signature files before re-signing
    zip.remove('META-INF/CERT.SF');
    zip.remove('META-INF/CERT.RSA');
    zip.remove('META-INF/MANIFEST.MF');

    // Generate unsigned APK archive buffer
    const unsignedApkBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    // Obtain Signing Certificate & Key
    const { certPem, pkcs8PrivKeyPem } = getSigningCredentials();

    // Sign the APK with APK Signature Scheme v2/v3 + v1 JAR scheme
    const signResult = await signApk(unsignedApkBuffer, pkcs8PrivKeyPem, certPem);
    const finalApkBuffer = Buffer.from(signResult.signedApk);

    const safeFilename = `${appName.toLowerCase().replace(/[^a-z0-9_-]/g, '_') || 'app'}-release.apk`;

    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
    res.setHeader('Content-Length', finalApkBuffer.length);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    res.send(finalApkBuffer);
  } catch (error: any) {
    console.error('Error generating APK:', error);
    res.status(500).json({
      error: 'Failed to compile APK',
      details: error?.message || 'Unknown compilation error'
    });
  }
});

// Vite Middleware for Dev / Static Handler for Production
async function setupServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Web2App Studio Server] Running on http://localhost:${PORT}`);
  });
}

setupServer();
