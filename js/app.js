// Web2App Studio Pro - Complete Engine with All-in-One Capabilities
let currentLanguage = 'en';
let currentSourceMode = 'editor'; // 'editor' | 'upload' | 'url'
let uploadedZipFiles = null; // Map of { relativePath: ArrayBuffer }
let uploadedZipBlobUrls = {}; // Map of { relativePath: blobUrl }

function revokeUploadedZipBlobUrls() {
    for (const url of Object.values(uploadedZipBlobUrls)) {
        try { URL.revokeObjectURL(url); } catch (e) {}
    }
    uploadedZipBlobUrls = {};
}

function getMimeType(filePath) {
    const ext = filePath.split('.').pop().toLowerCase();
    const map = {
        'html': 'text/html',
        'htm': 'text/html',
        'css': 'text/css',
        'js': 'text/javascript',
        'json': 'application/json',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'webp': 'image/webp',
        'ico': 'image/x-icon',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'ttf': 'font/ttf',
        'otf': 'font/otf',
        'eot': 'application/vnd.ms-fontobject',
        'mp3': 'audio/mpeg',
        'wav': 'audio/wav',
        'mp4': 'video/mp4',
        'webm': 'video/webm'
    };
    return map[ext] || 'application/octet-stream';
}

// Icon Studio State
let iconShape = 'squircle';
let iconGradStart = '#10b981';
let iconGradEnd = '#059669';
let iconGlyph = '⚡';
let customIconBase64 = null;
let customSplashBase64 = null;

// Translations Dictionary (English & Bengali)
const translations = {
    en: {
        headerSubtitle: "Create, Design, and Build Complete Android Apps from One Website",
        navBridge: "Native Bridge API",
        navCloudBuild: "Free Cloud APK",
        navKeystore: "Keystore Guide",
        navGenerate: "Generate App",
        pillStep1: "STEP 01",
        step1Title: "App Source & Ready Templates",
        pillStep2: "STEP 02",
        step2Title: "App Identity & Package Details",
        pillStep3: "STEP 03",
        step3Title: "App Icon & Branding Studio",
        pillStep4: "STEP 04",
        step4Title: "Android Navigation & Screen UX",
        pillStep5: "STEP 05",
        step5Title: "Native Bottom Navigation Tabs",
        pillStep6: "STEP 06",
        step6Title: "Web-to-Native JavaScript Bridge",
        pillStep7: "STEP 07",
        step7Title: "Screen Display, Orientation & Security",
        pillStep8: "STEP 08",
        step8Title: "Media, File Chooser & Permissions",
        pillStep9: "STEP 09",
        step9Title: "Monetization & Push Notifications",
        pillStep10: "STEP 10",
        step10Title: "Generate, Build & Export App",
        templatesHeader: "1-Click Starter Mobile App Templates",
        templateHint: "Click any template to instantly load full code and preview:",
        tplEcomTitle: "E-Commerce Store",
        tplEcomDesc: "Cart drawer, price counter, WhatsApp order button",
        tplNewsTitle: "News & Magazine",
        tplNewsDesc: "Categories, live ticker, reader modal, bookmarks",
        tplGameTitle: "2D Arcade Game",
        tplGameDesc: "Touch controls, particle explosions, haptic vibration",
        tplBizTitle: "Business Portfolio",
        tplBizDesc: "Services grid, booking form, WhatsApp direct call",
        tplMusicTitle: "Audio & Music",
        tplMusicDesc: "Dark player, vinyl spinning, playlist, equalizer",
        tplTaskTitle: "Task & Todo",
        tplTaskDesc: "Offline persistent storage, filter tabs, stats ring",
        tabEditor: "Code Editor",
        tabUpload: "Upload Files / ZIP",
        tabUrl: "Website URL",
        insertLabel: "Insert UI Blocks:",
        editorHint: "Edit HTML, CSS, JavaScript in one place:",
        uploadHeadline: "Click to upload HTML file or full project ZIP",
        uploadSub: "Supports single index.html or .zip containing images, CSS, JS, and subfolders.",
        urlLabel: "Website URL to Convert *",
        urlSub: "The Android app will load this live website directly inside Android WebView with full offline fallback.",
        sec2Title: "App Identity & Package",
        appNameLabel: "App Name *",
        pkgNameLabel: "Package Name (Application ID) *",
        pkgTooltip: "Unique identifier on Google Play (e.g. com.company.appname).",
        versionNameLabel: "Version Name",
        versionCodeLabel: "Version Code",
        versionCodeTooltip: "Internal integer incremented on every Play Store release.",
        sec3Title: "Built-in Icon & Branding Studio",
        studioBadge: "Icon Maker",
        primaryColorLabel: "Primary Color (Toolbar & Splash)",
        accentColorLabel: "Accent Color (Buttons & Highlights)",
        canvasPreviewLabel: "Real-time Android Icon",
        shapeLabel: "Icon Shape & Cut:",
        gradLabel: "Gradient Presets:",
        glyphLabel: "Choose Icon Symbol / Emoji:",
        textIconLabel: "Or Custom Text/Monogram",
        customIconUploadLabel: "Or Upload Custom PNG",
        splashTitle: "Enable Native Splash Screen (2 seconds delay)",
        splashDesc: "Shows sleek branding launch screen with app logo and title before loading web content.",
        splashTextLabel: "Splash Screen Title",
        splashImgLabel: "Custom Splash Image (Optional)",
        secBridgeTitle: "Web-to-Native Android JavaScript Bridge",
        bridgeTitle: "Enable Native AndroidBridge JavaScript Interface",
        bridgeDesc: "Empowers your web code to trigger native Android features: Toasts, Haptic Vibrate, Share Dialog, System Clipboard, and External Browser.",
        sec4Title: "Android Navigation & UX",
        topBarTitle: "Top Header / Action Bar",
        topBarDesc: "Displays top colored app bar with title. Uncheck to make website 100% full-screen without title bar.",
        smartBackTitle: "Smart Back Button Handling",
        smartBackDesc: "Hardware back button navigates WebView browser history; double-tap exits app.",
        pullRefreshTitle: "Pull to Refresh (SwipeRefreshLayout)",
        pullRefreshDesc: "Adds smooth Android swipe down gesture to reload current web page.",
        progBarTitle: "Loading Progress Bar",
        progBarDesc: "Displays horizontal progress bar at top of screen while page loads.",
        offlineTitle: "Custom Offline & No-Internet Screen",
        offlineDesc: "Displays friendly offline screen with a Retry button when phone loses connection.",
        sec5Title: "Native Bottom Navigation Bar",
        bottomNavTitle: "Enable Native Bottom Navigation Bar",
        bottomNavDesc: "Adds native Android BottomNavigationView to switch between multiple tabs or pages.",
        bottomNavHint: "Configure up to 4 bottom tabs:",
        sec6Title: "App Security & Privacy",
        bioTitle: "Biometric Lock (Fingerprint / Face Unlock)",
        bioDesc: "Prompts Android BiometricPrompt on app launch for maximum privacy.",
        secModeTitle: "Prevent Screenshot & Recording (FLAG_SECURE)",
        secModeDesc: "Blocks screenshots and screen recording inside the Android app.",
        sec7Title: "Display & Orientation",
        orientationLabel: "Screen Orientation",
        displayEnhanceLabel: "Display Enhancements",
        fullscreenTitle: "Full-Screen (Immersive Mode)",
        fullscreenDesc: "Hides Android status bar and top action bar.",
        keepScreenTitle: "Keep Screen On",
        keepScreenDesc: "Prevents display from going to sleep while app is open.",
        darkModeTitle: "Force Dark Theme (WebSettingsCompat)",
        darkModeDesc: "Forces web content to render in high-contrast dark mode.",
        sec8Title: "Media, File Chooser & Permissions",
        fileChooserTitle: "File Upload & Camera Chooser",
        fileChooserDesc: "Connects HTML <input type='file'> to Android gallery and camera picker.",
        downloadMgrTitle: "Android Download Manager Support",
        downloadMgrDesc: "Downloads PDF, images, and files via Android's native DownloadManager.",
        extLinksTitle: "External Intents (WhatsApp, Tel, Email)",
        extLinksDesc: "Opens tel:, mailto:, sms:, WhatsApp, and Maps in external native apps.",
        ratingTitle: "In-App Review / Rating Prompt",
        ratingDesc: "Prompts user to rate the app on Google Play after several launches.",
        userAgentLabel: "Custom User-Agent Identifier",
        secPermissionsTitle: "Android App Permissions",
        secMonetizeTitle: "Monetization & Push Notifications",
        btnBuildApk: "Build & Download Direct APK",
        btnBuildApkSub: "Compile, sign with v1+v2 Keystore, and download a 100% installable Android APK directly from this website!",
        modalApkTitle: "Direct APK Compiler & Signer",
        navDirectApk: "Direct APK",
        btnGenAndroid: "Generate Android Project (ZIP)",
        btnDownloadHtml: "Download Single HTML App",
        btnDownloadPwa: "Download PWA Package",
        btnCloudBuild: "Free Cloud APK (GitHub)",
        navHealthCheck: "App Health Audit",
        tplChatTitle: "AI Chat & Messenger",
        tplChatDesc: "Modern chat bubbles, smart bot, haptic feedback",
        tplQuizTitle: "Quiz & Trivia",
        tplQuizDesc: "Interactive timer, score tracker, celebration sound",
        explorerTitle: "Project Assets & Files:",
        deepLinkTitle: "Deep Linking & Custom App Scheme",
        deepLinkDesc: "Opens app from browser links (e.g. myapp://home or https://yourdomain.com).",
        urlSchemeLabel: "Custom App Scheme",
        deepLinkHostLabel: "App Link Domain (Host)",
        floatingWidgetTitle: "Floating Support Button (WhatsApp / Call)",
        floatingWidgetDesc: "Adds sleek corner floating contact widget inside app for instant customer support.",
        fabTypeLabel: "Contact Action Type",
        fabTargetLabel: "Phone / WhatsApp Number",
        auditModalTitle: "App Health Doctor & Google Play Readiness",
        btnReset: "Reset All",
        loadingText: "Generating complete Android Studio project with all features & icons...",
        mockupHeader: "Live Interactive Mobile Mockup",
        qrTitle: "Scan to Test on Real Phone",
        qrDesc: "Scan with your phone camera to test this web application directly on your device before downloading the Android project.",
        fileStructureTitle: "Generated Project Structure",
        buildHelpTitle: "💡 How to Build APK:",
        buildHelpSteps: "1. Click Generate Android Project to download the ZIP.<br>2. Extract the ZIP on your PC.<br>3. Open Android Studio and select File > Open on the extracted folder.<br>4. Let Gradle sync, then click Build > Build Bundle(s) / APK(s) > Build APK(s).<br><em>No Android Studio? Use our included GitHub Actions workflow for 100% free cloud APK compilation!</em>",
        wTab1: "Source & Code",
        wTab2: "Brand & Icon",
        wTab3: "UX & Nav",
        wTab4: "Bridge & Perms",
        wTab5: "Export APK",
        btnPrevStage: "Previous Stage",
        btnNextStage: "Next Stage",
        viewAllSteps: "👁️ View All Steps",
        viewWizardSteps: "📑 View Wizard Stages",
        stagePrefix: "Stage",
        stageOf: "of",
        stage1Name: "Source & Code",
        stage2Name: "Brand & Identity",
        stage3Name: "Navigation & UX",
        stage4Name: "Bridge & Security",
        stage5Name: "Build & Export",
        themeDark: "Dark",
        themeLight: "Light"
    },
    bn: {
        headerSubtitle: "একটি ওয়েবসাইট থেকেই যেকোনো মোবাইল অ্যাপ ডিজাইন, কোড ও বিল্ড করুন",
        navBridge: "নেটিভ ব্রিজ এপিআই",
        navCloudBuild: "ফ্রি ক্লাউড APK",
        navKeystore: "কিস্টোর গাইড",
        navGenerate: "অ্যাপ তৈরি করুন",
        pillStep1: "ধাপ ০১",
        step1Title: "অ্যাপের সোর্স কোড ও তৈরি টেমপ্লেট",
        pillStep2: "ধাপ ০২",
        step2Title: "অ্যাপের নাম ও প্যাকেজ আইডি",
        pillStep3: "ধাপ ০৩",
        step3Title: "বিল্ট-ইন আইকন ও ব্র্যান্ডিং স্টুডিও",
        pillStep4: "ধাপ ০৪",
        step4Title: "অ্যান্ড্রয়েড নেভিগেশন ও স্ক্রিন কন্ট্রোল",
        pillStep5: "ধাপ ০৫",
        step5Title: "নেটিভ বটম নেভিগেশন বার",
        pillStep6: "ধাপ ০৬",
        step6Title: "ওয়েব-টু-অ্যান্ড্রয়েড জাভাস্ক্রিপ্ট ব্রিজ",
        pillStep7: "ধাপ ০৭",
        step7Title: "স্ক্রিন ডিসপ্লে, ওরিয়েন্টেশন ও সিকিউরিটি",
        pillStep8: "ধাপ ০৮",
        step8Title: "মিডিয়া, ফাইল চুজ়ার ও পারমিশন",
        pillStep9: "ধাপ ০৯",
        step9Title: "বিজ্ঞাপন (AdMob) ও পুশ নোটিফিকেশন",
        pillStep10: "ধাপ ১০",
        step10Title: "অ্যাপ তৈরি, বিল্ড ও ডাউনলোড",
        templatesHeader: "১-ক্লিকে ফুল রেডিমেড মোবাইল অ্যাপ টেমপ্লেট",
        templateHint: "যেকোনো টেমপ্লেটে ক্লিক করলেই সম্পূর্ণ কোড ও লাইভ প্রিভিউ লোড হবে:",
        tplEcomTitle: "ই-কমার্স শপ",
        tplEcomDesc: "কার্ট ড্রয়ার, প্রোডাক্ট গ্রিড, হোয়াটসঅ্যাপ অর্ডার বাটন",
        tplNewsTitle: "নিউজ ও ম্যাগাজিন",
        tplNewsDesc: "ক্যাটাগরি, লাইভ ব্রেকিং স্ক্রলার, বুকমার্কিং",
        tplGameTitle: "২ডি স্পেস আর্কেড গেম",
        tplGameDesc: "টাচ কন্ট্রোল, লেজার গান, হাই-স্কোর ও ভাইব্রেশন",
        tplBizTitle: "বিজনেস ও সার্ভিস পোর্টাল",
        tplBizDesc: "সার্ভিস গ্রিড, বুকিং ফর্ম, সরাসরি হোয়াটসঅ্যাপ কল",
        tplMusicTitle: "অডিও ও মিউজিক প্লেয়ার",
        tplMusicDesc: "ডার্ক প্লেয়ার, রেকর্ড স্পিনিং, প্লেলিস্ট কন্ট্রোল",
        tplTaskTitle: "টাস্ক ও টু-ডু অ্যাপ",
        tplTaskDesc: "অফলাইন লোকালস্টোরেজ, ফিল্টার ও অগ্রগতি চার্ট",
        tabEditor: "কোড এডিটর",
        tabUpload: "ফাইল / জিপ আপলোড",
        tabUrl: "ওয়েবসাইট লিঙ্ক (URL)",
        insertLabel: "কম্পোনেন্ট যুক্ত করুন:",
        editorHint: "এক ফাইলে HTML, CSS ও JavaScript কোড এডিট করুন:",
        uploadHeadline: "HTML ফাইল বা পুরো প্রজেক্টের ZIP আপলোড করুন",
        uploadSub: "সিঙ্গেল index.html বা ইমেজ, সিএসএস, জেএস সহ সম্পূর্ণ .zip ফাইল সাপোর্ট করে।",
        urlLabel: "যে ওয়েবসাইট কনভার্ট করতে চান *",
        urlSub: "অ্যান্ড্রয়েড অ্যাপে সরাসরি এই লাইভ ওয়েবসাইটটি সুরক্ষিত WebView-তে চলবে এবং নেট না থাকলে অফলাইন স্ক্রিন দেখাবে।",
        sec2Title: "অ্যাপের নাম ও প্যাকেজ আইডি",
        appNameLabel: "অ্যাপের নাম *",
        pkgNameLabel: "প্যাকেজ আইডি (Application ID) *",
        pkgTooltip: "গুগল প্লে স্টোরে আপনার অ্যাপের ইউনিক নাম (যেমন: com.company.appname)।",
        versionNameLabel: "ভার্সন নাম",
        versionCodeLabel: "ভার্সন কোড",
        versionCodeTooltip: "প্রতি আপডেটে বাড়ানোর জন্য পূর্ণসংখ্যা।",
        sec3Title: "বিল্ট-ইন আইকন ও ব্র্যান্ডিং স্টুডিও",
        studioBadge: "আইকন মেকার",
        primaryColorLabel: "মূল থিম কালার (টুলবার ও স্প্ল্যাশ)",
        accentColorLabel: "অ্যাকসেন্ট কালার (বাটন ও হাইলাইট)",
        canvasPreviewLabel: "লাইভ অ্যান্ড্রয়েড আইকন",
        shapeLabel: "আইকনের আকার (Shape):",
        gradLabel: "গ্রেডিয়েন্ট প্রিসেট:",
        glyphLabel: "আইকন সিম্বল / ইমোজি পছন্দ করুন:",
        textIconLabel: "অথবা কাস্টম টেক্সট / অক্ষর",
        customIconUploadLabel: "অথবা নিজস্ব লোগো PNG আপলোড",
        splashTitle: "স্প্ল্যাশ স্ক্রিন চালু রাখুন (২ সেকেন্ড)",
        splashDesc: "অ্যাপ ওপেন করার সময় চমৎকার লোগো ও নাম সহ ইন্ট্রো স্ক্রিন দেখাবে।",
        splashTextLabel: "স্প্ল্যাশ স্ক্রিন শিরোনাম",
        splashImgLabel: "কাস্টম স্প্ল্যাশ ইমেজ (ঐচ্ছিক)",
        secBridgeTitle: "ওয়েব-টু-অ্যান্ড্রয়েড জাভাস্ক্রিপ্ট ব্রিজ (AndroidBridge)",
        bridgeTitle: "AndroidBridge জাভাস্ক্রিপ্ট ইন্টারফেস চালু রাখুন",
        bridgeDesc: "আপনার ওয়েব কোড থেকেই মোবাইলের নেটিভ ফিচার যেমন টোস্ট মেসেজ, ভাইব্রেশন, শেয়ার শিট, ক্লিপবোর্ড ও ব্রাউজার চালাতে পারবেন।",
        sec4Title: "অ্যান্ড্রয়েড নেভিগেশন ও ইউজার এক্সপেরিয়েন্স",
        topBarTitle: "টপ হেডার / অ্যাকশন বার",
        topBarDesc: "অ্যাপের উপরের কালারফুল টাইটেল বার। বন্ধ করলে ওয়েবসাইটটি কোনো হেডার বার ছাড়াই ১০০% ক্লিন ফুল-স্ক্রিনে চলবে।",
        smartBackTitle: "স্মার্ট ব্যাক বাটন হ্যান্ডলিং",
        smartBackDesc: "মোবাইলের ব্যাক বাটন চাপলে আগের পেজে যাবে; পরপর দুইবার চাপলে অ্যাপ বন্ধ হবে।",
        pullRefreshTitle: "পুল টু রিফ্রেশ (Pull to Refresh)",
        pullRefreshDesc: "স্ক্রিন উপর থেকে নিচে টানলে পেজ রিলোড হবে।",
        progBarTitle: "লোডিং প্রগ্রেস বার",
        progBarDesc: "পেজ লোড হওয়ার সময় স্ক্রিনের উপরে আধুনিক প্রগ্রেস বার দেখাবে।",
        offlineTitle: "কাস্টম অফলাইন ও নো-ইন্টারনেট স্ক্রিন",
        offlineDesc: "ইন্টারনেট কানেকশন হারিয়ে গেলে চমৎকার অফলাইন স্ক্রিন ও 'রিট্রাই' বাটন দেখাবে।",
        sec5Title: "নেটিভ বটম নেভিগেশন বার",
        bottomNavTitle: "নেটিভ বটম বার যুক্ত করুন",
        bottomNavDesc: "স্ক্রিনের নিচে ৪টি ট্যাবের মাধ্যমে বিভিন্ন পেজে সহজে চলাচলের সুবিধা।",
        bottomNavHint: "বটম বারের ট্যাবগুলো সেট করুন:",
        sec6Title: "অ্যাপ সিকিউরিটি ও প্রাইভেসি",
        bioTitle: "বায়োমেট্রিক লক (আঙুলের ছাপ / ফেস আনলক)",
        bioDesc: "অ্যাপ ওপেন করার সাথে সাথে আঙুলের ছাপ বা ফেস আইডি ছাড়া ওপেন হবে না।",
        secModeTitle: "স্ক্রিনশট ও স্ক্রিন রেকর্ডিং বন্ধ রাখুন (FLAG_SECURE)",
        secModeDesc: "অ্যাপের ভেতর কেউ স্ক্রিনশট বা ভিডিও রেকর্ডিং করতে পারবে না।",
        sec7Title: "স্ক্রিন ও ডিসপ্লে সেটিংস",
        orientationLabel: "স্ক্রিন ওরিয়েন্টেশন",
        displayEnhanceLabel: "ডিসপ্লে অতিরিক্ত সুবিধা",
        fullscreenTitle: "ফুল-স্ক্রিন মোড (Immersive)",
        fullscreenDesc: "মোবাইলের উপরের স্ট্যাটাস বার ও অ্যাকশন বার লুকিয়ে রাখবে।",
        keepScreenTitle: "স্ক্রিন অন রাখুন (Keep Screen On)",
        keepScreenDesc: "অ্যাপ চালু থাকা অবস্থায় ফোনের লাইট বা ডিসপ্লে নিভবে না।",
        darkModeTitle: "ফোর্স ডার্ক মোড (Dark Theme)",
        darkModeDesc: "ওয়েব কনটেন্টকে স্বয়ংক্রিয়ভাবে ডার্ক মোডে রেন্ডার করবে।",
        sec8Title: "মিডিয়া, ফাইল আপলোড ও পারমিশন",
        fileChooserTitle: "ফাইল আপলোড ও ক্যামেরা চুজ়ার",
        fileChooserDesc: "ওয়েবের <input type='file'> চাপলে ফোনের গ্যালারি ও ক্যামেরা ওপেন হবে।",
        downloadMgrTitle: "অ্যান্ড্রয়েড ডাউনলোড ম্যানেজার",
        downloadMgrDesc: "PDF বা ফাইল ডাউনলোড সরাসরি মোবাইলের ডাউনলোড ফোল্ডারে সেভ হবে।",
        extLinksTitle: "এক্সটার্নাল লিঙ্ক ও অ্যাপ ওপেন (WhatsApp, কল, ম্যাপ)",
        extLinksDesc: "tel:, mailto:, WhatsApp ইত্যাদি সরাসরি মোবাইলের অ্যাপে ওপেন করবে।",
        ratingTitle: "গুগল প্লে স্টোর রেটিং প্রম্পট",
        ratingDesc: "কয়েকবার অ্যাপ ব্যবহারের পর ব্যবহারকারীকে রেটিং দেওয়ার অনুরোধ করবে।",
        userAgentLabel: "কাস্টম User-Agent আইডেন্টিফায়ার",
        secPermissionsTitle: "অ্যান্ড্রয়েড অ্যাপ পারমিশনসমূহ",
        secMonetizeTitle: "বিজ্ঞাপন (AdMob) ও পুশ নোটিফিকেশন",
        btnBuildApk: "সরাসরি APK তৈরি ও ডাউনলোড করুন",
        btnBuildApkSub: "অ্যান্ড্রয়েড স্টুডিও ছাড়াই সরাসরি সাইন করা ইনস্টলযোগ্য APK ডাউনলোড করুন!",
        modalApkTitle: "সরাসরি APK কম্পাইলার ও সাইনার",
        navDirectApk: "সরাসরি APK",
        btnGenAndroid: "অ্যান্ড্রয়েড প্রজেক্ট জিপ তৈরি করুন (ZIP)",
        btnDownloadHtml: "সিঙ্গেল HTML অ্যাপ ডাউনলোড করুন",
        btnDownloadPwa: "PWA প্যাকেজ ডাউনলোড করুন",
        btnCloudBuild: "ফ্রি ক্লাউড APK (গিটহাব)",
        navHealthCheck: "অ্যাপ হেলথ অডিট",
        tplChatTitle: "এআই চ্যাট ও মেসেঞ্জার",
        tplChatDesc: "স্মার্ট চ্যাট বাবল, বটের উত্তর ও টাচ ভাইব্রেশন",
        tplQuizTitle: "কুইজ ও ব্রেন ট্রেইনার",
        tplQuizDesc: "কাউন্টডাউন টাইমার, স্কোরবোর্ড ও অডিও ভাইব",
        explorerTitle: "প্রজেক্টের সব ফাইল ও অ্যাসেট:",
        deepLinkTitle: "ডিপ লিঙ্কিং ও কাস্টম অ্যাপ স্কিম",
        deepLinkDesc: "ব্রাউজারের লিঙ্ক থেকে সরাসরি মোবাইল অ্যাপ ওপেন করার সুবিধা (myapp://)।",
        urlSchemeLabel: "কাস্টম অ্যাপ স্কিম (যেমন myapp)",
        deepLinkHostLabel: "অ্যাপ লিঙ্ক ডোমেইন (Host)",
        floatingWidgetTitle: "ভাসমান কন্টাক্ট বাটন (WhatsApp / Call)",
        floatingWidgetDesc: "অ্যাপের কোণায় আধুনিক কন্টাক্ট বাটন, সরাসরি গ্রাহক সেবা দেওয়ার জন্য।",
        fabTypeLabel: "কন্টাক্টের ধরন",
        fabTargetLabel: "ফোন / হোয়াটসঅ্যাপ নম্বর",
        auditModalTitle: "অ্যাপ হেলথ ডক্টর ও প্লে স্টোর অডিট",
        btnReset: "রিসেট করুন",
        loadingText: "সব ফিচার ও আইকন সহ অ্যান্ড্রয়েড স্টুডিও প্রজেক্ট তৈরি হচ্ছে...",
        mockupHeader: "লাইভ মোবাইল মকআপ প্রিভিউ",
        qrTitle: "আসল ফোনে সরাসরি টেস্ট করুন",
        qrDesc: "আপনার ফোনের ক্যামেরা দিয়ে কিউআর কোড স্ক্যান করে অ্যাপটি সরাসরি চালিয়ে দেখুন।",
        fileStructureTitle: "তৈরিকৃত প্রজেক্ট ফাইলের স্ট্রাকচার",
        buildHelpTitle: "💡 কীভাবে APK বিল্ড করবেন:",
        buildHelpSteps: "১. 'অ্যান্ড্রয়েড প্রজেক্ট জিপ তৈরি করুন' বাটনে ক্লিক করে ZIP ডাউনলোড করুন।<br>২. আপনার কম্পিউটারে ZIP ফাইলটি আনজিপ (Extract) করুন।<br>৩. Android Studio সফটওয়্যারটি ওপেন করে File > Open দিয়ে ফোল্ডারটি ওপেন করুন।<br>৪. Gradle সিঙ্ক শেষ হলে মেনু থেকে Build > Build Bundle(s) / APK(s) > Build APK(s) ক্লিক করুন।<br><em>কম্পিউটার না থাকলেও চিন্তার কারণ নেই! আমাদের ফাইলে <strong>GitHub Actions</strong> দেওয়া আছে যা গিটহাবে আপলোড করলেই ফ্রিতে সরাসরি APK বিল্ড করে দেয়!</em>",
        wTab1: "সোর্স ও কোড",
        wTab2: "ব্র্যান্ড ও আইকন",
        wTab3: "ইউআই ও ন্যাভ",
        wTab4: "ব্রিজ ও পারমিশন",
        wTab5: "বিল্ড ও এক্সপোর্ট",
        btnPrevStage: "পূর্ববর্তী ধাপ",
        btnNextStage: "পরবর্তী ধাপ",
        viewAllSteps: "👁️ সব ধাপ একসাথে",
        viewWizardSteps: "📑 উইজার্ড মোড",
        stagePrefix: "ধাপ",
        stageOf: "/",
        stage1Name: "সোর্স ও কোড",
        stage2Name: "ব্র্যান্ড ও পরিচয়",
        stage3Name: "ন্যাভিগেশন ও ইউএক্স",
        stage4Name: "ব্রিজ ও সিকিউরিটি",
        stage5Name: "বিল্ড ও এক্সপোর্ট",
        themeDark: "ডার্ক",
        themeLight: "লাইট"
    }
};

function switchLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('langBtnEn').classList.toggle('active', lang === 'en');
    document.getElementById('langBtnBn').classList.toggle('active', lang === 'bn');
    
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    if (typeof updateWizardControls === 'function') {
        updateWizardControls();
    }
    const themeLabel = document.getElementById('themeLabel');
    if (themeLabel) {
        const isDark = document.body.classList.contains('cyber-dark');
        themeLabel.textContent = isDark ? (dict.themeLight || 'Light') : (dict.themeDark || 'Dark');
    }

    showNotification(lang === 'bn' ? '🇧🇩 ভাষা পরিবর্তন করা হয়েছে: বাংলা' : '🇬🇧 Language changed: English', 2000);
}

// 6 Full Complete App Templates
const appTemplates = {
    ecommerce: {
        appName: "UrbanStore",
        packageName: "com.urbanstore.mobile",
        primaryColor: "#10b981",
        accentColor: "#f59e0b",
        iconGlyph: "🛒",
        gradStart: "#10b981",
        gradEnd: "#059669",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UrbanStore Mobile</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, system-ui, sans-serif; }
        body { background: #f8fafc; color: #1e293b; padding-bottom: 70px; }
        .store-header { background: #10b981; color: white; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .cart-badge { background: #f59e0b; color: white; border-radius: 9999px; padding: 2px 8px; font-size: 11px; font-weight: bold; margin-left: 4px; }
        .search-bar { padding: 10px 16px; background: white; border-bottom: 1px solid #e2e8f0; }
        .search-input { width: 100%; padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 20px; font-size: 13px; outline: none; }
        .banner { margin: 12px 16px; background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 16px; border-radius: 12px; }
        .product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 16px; }
        .product-card { background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; display: flex; flex-direction: column; }
        .product-img { width: 100%; height: 110px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; }
        .product-info { padding: 10px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .product-title { font-size: 13px; font-weight: bold; margin-bottom: 4px; }
        .product-price { font-size: 14px; color: #10b981; font-weight: 800; }
        .btn-add { background: #10b981; color: white; border: none; padding: 6px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-top: 6px; cursor: pointer; }
        .btn-order-wa { display: block; margin: 16px; background: #25d366; color: white; text-align: center; padding: 12px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 14px; border: none; width: calc(100% - 32px); cursor: pointer; }
    </style>
</head>
<body>
    <div class="store-header">
        <h3 style="font-size: 16px;">🛍️ UrbanStore</h3>
        <div onclick="viewCart()" style="cursor: pointer; font-size: 14px;">🛒 Cart <span class="cart-badge" id="cartCount">0</span></div>
    </div>
    <div class="search-bar">
        <input type="text" class="search-input" placeholder="🔍 Search products, clothes, gadgets...">
    </div>
    <div class="banner">
        <span style="font-size: 11px; background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px;">SPECIAL OFFER</span>
        <h2 style="font-size: 18px; margin-top: 4px;">Get 30% Off Today!</h2>
        <p style="font-size: 12px; opacity: 0.9;">Use code <strong>MOBILE30</strong> at checkout</p>
    </div>
    <div class="product-grid">
        <div class="product-card">
            <div class="product-img">👟</div>
            <div class="product-info">
                <div>
                    <div class="product-title">Air Cushion Sneakers</div>
                    <div class="product-price">$59.99</div>
                </div>
                <button class="btn-add" onclick="addToCart('Air Sneakers', 59.99)">+ Add to Cart</button>
            </div>
        </div>
        <div class="product-card">
            <div class="product-img">⌚</div>
            <div class="product-info">
                <div>
                    <div class="product-title">Pro Smart Watch X2</div>
                    <div class="product-price">$89.00</div>
                </div>
                <button class="btn-add" onclick="addToCart('Smart Watch', 89.00)">+ Add to Cart</button>
            </div>
        </div>
        <div class="product-card">
            <div class="product-img">🎧</div>
            <div class="product-info">
                <div>
                    <div class="product-title">Noise Cancelling Pro</div>
                    <div class="product-price">$74.50</div>
                </div>
                <button class="btn-add" onclick="addToCart('Wireless Headset', 74.50)">+ Add to Cart</button>
            </div>
        </div>
        <div class="product-card">
            <div class="product-img">🎒</div>
            <div class="product-info">
                <div>
                    <div class="product-title">Waterproof City Bag</div>
                    <div class="product-price">$39.00</div>
                </div>
                <button class="btn-add" onclick="addToCart('City Bag', 39.00)">+ Add to Cart</button>
            </div>
        </div>
    </div>
    <button class="btn-order-wa" onclick="orderViaWhatsApp()">💬 Order Directly via WhatsApp</button>
    <script>
        let cart = [];
        function addToCart(title, price) {
            cart.push({ title, price });
            document.getElementById('cartCount').textContent = cart.length;
            if (window.AndroidBridge) {
                AndroidBridge.showToast("Added " + title + " to Cart! 🛒");
                AndroidBridge.vibrate(50);
            } else {
                alert("Added " + title + " to Cart!");
            }
        }
        function viewCart() {
            if (cart.length === 0) {
                alert("Your cart is empty! Add products first.");
                return;
            }
            let total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
            alert("Cart items: " + cart.length + "\\nTotal: $" + total);
        }
        function orderViaWhatsApp() {
            let msg = "Hello, I want to order from UrbanStore! Total items in cart: " + cart.length;
            if (window.AndroidBridge) {
                AndroidBridge.openExternal("https://wa.me/?text=" + encodeURIComponent(msg));
            } else {
                window.open("https://wa.me/?text=" + encodeURIComponent(msg), '_blank');
            }
        }
    </script>
</body>
</html>`
    },
    news: {
        appName: "DailyPulse",
        packageName: "com.dailypulse.news",
        primaryColor: "#0284c7",
        accentColor: "#ef4444",
        iconGlyph: "📰",
        gradStart: "#0284c7",
        gradEnd: "#0369a1",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DailyPulse News</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, system-ui, sans-serif; }
        body { background: #f8fafc; color: #1e293b; padding-bottom: 60px; }
        .news-header { background: #0284c7; color: white; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 10; }
        .ticker { background: #ef4444; color: white; padding: 6px 14px; font-size: 11px; font-weight: bold; overflow: hidden; white-space: nowrap; }
        .categories { display: flex; gap: 8px; padding: 10px 16px; overflow-x: auto; background: white; border-bottom: 1px solid #e2e8f0; }
        .cat-chip { padding: 4px 12px; border-radius: 16px; background: #f1f5f9; font-size: 12px; font-weight: 600; color: #475569; white-space: nowrap; cursor: pointer; }
        .cat-chip.active { background: #0284c7; color: white; }
        .news-list { padding: 12px 16px; display: flex; flex-direction: column; gap: 12px; }
        .news-item { background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; display: flex; flex-direction: column; }
        .news-hero-img { height: 130px; background: linear-gradient(135deg, #0ea5e9, #6366f1); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: white; }
        .news-body { padding: 14px; }
        .news-tag { color: #0284c7; font-size: 11px; font-weight: bold; text-transform: uppercase; }
        .news-title { font-size: 15px; font-weight: bold; margin: 4px 0 6px 0; line-height: 1.35; }
        .news-desc { font-size: 12px; color: #64748b; line-height: 1.4; }
        .news-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; border-top: 1px solid #f1f5f9; padding-top: 8px; }
        .share-btn { background: #f1f5f9; border: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; color: #334155; }
    </style>
</head>
<body>
    <div class="news-header">
        <h3 style="font-size: 16px;">📰 DailyPulse News</h3>
        <span style="font-size: 12px;" onclick="shareApp()">📤 Share</span>
    </div>
    <div class="ticker">
        🔴 BREAKING: New Next-Gen Space Telescope Discovers Habitable Exoplanet
    </div>
    <div class="categories">
        <div class="cat-chip active">All News</div>
        <div class="cat-chip">Tech & AI</div>
        <div class="cat-chip">World</div>
        <div class="cat-chip">Science</div>
        <div class="cat-chip">Finance</div>
    </div>
    <div class="news-list">
        <div class="news-item">
            <div class="news-hero-img">🚀</div>
            <div class="news-body">
                <span class="news-tag">Technology</span>
                <div class="news-title">AI Breakthrough: Humanoid Robots Reach Commercial Production</div>
                <div class="news-desc">Leading tech robotics laboratories announced the commercial rollout of battery-powered assist bots across logistics hubs globally.</div>
                <div class="news-actions">
                    <span style="font-size: 11px; color: #94a3b8;">15 mins ago • 3 min read</span>
                    <button class="share-btn" onclick="shareArticle('Humanoid Robots Reach Commercial Production')">📤 Share</button>
                </div>
            </div>
        </div>
        <div class="news-item">
            <div class="news-hero-img" style="background: linear-gradient(135deg, #10b981, #06b6d4);">🌍</div>
            <div class="news-body">
                <span class="news-tag">Environment</span>
                <div class="news-title">Global Clean Energy Production Hits Record High in 2026</div>
                <div class="news-desc">Solar and offshore wind farms now provide over 45% of total electric power in more than 28 participating countries.</div>
                <div class="news-actions">
                    <span style="font-size: 11px; color: #94a3b8;">1 hour ago • 2 min read</span>
                    <button class="share-btn" onclick="shareArticle('Clean Energy Hits Record High')">📤 Share</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        function shareArticle(title) {
            if (window.AndroidBridge) {
                AndroidBridge.shareText(title + " - Read more on DailyPulse News app!", "Share Article");
                AndroidBridge.vibrate(40);
            } else if (navigator.share) {
                navigator.share({ title: title, text: "Read on DailyPulse: " + title });
            } else {
                alert("Share: " + title);
            }
        }
        function shareApp() {
            if (window.AndroidBridge) {
                AndroidBridge.shareText("Download DailyPulse for instant breaking news updates!", "Share App");
            } else {
                alert("Share DailyPulse App");
            }
        }
    </script>
</body>
</html>`
    },
    game: {
        appName: "SpaceBlaster",
        packageName: "com.spaceblaster.arcade",
        primaryColor: "#8b5cf6",
        accentColor: "#f59e0b",
        iconGlyph: "🎮",
        gradStart: "#8b5cf6",
        gradEnd: "#6d28d9",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Space Blaster 2D</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; touch-action: none; user-select: none; }
        body { background: #0f172a; color: white; overflow: hidden; display: flex; flex-direction: column; height: 100vh; font-family: sans-serif; }
        #hud { display: flex; justify-content: space-between; padding: 10px 16px; background: rgba(0,0,0,0.5); font-size: 14px; font-weight: bold; }
        canvas { flex: 1; width: 100%; display: block; background: #020617; }
        #controls { padding: 12px; display: flex; justify-content: space-around; background: #1e293b; }
        .ctl-btn { background: #8b5cf6; color: white; border: none; padding: 14px 28px; border-radius: 12px; font-size: 16px; font-weight: bold; cursor: pointer; }
    </style>
</head>
<body>
    <div id="hud">
        <span>SCORE: <span id="scoreVal" style="color: #38bdf8;">0</span></span>
        <span>HIGH: <span id="highVal" style="color: #f59e0b;">0</span></span>
    </div>
    <canvas id="gameCanvas"></canvas>
    <div id="controls">
        <button class="ctl-btn" id="btnLeft">◀ LEFT</button>
        <button class="ctl-btn" style="background: #ef4444;" id="btnFire">🔥 FIRE</button>
        <button class="ctl-btn" id="btnRight">RIGHT ▶</button>
    </div>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        function resize() {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        let score = 0;
        let highScore = parseInt(localStorage.getItem('sb_high') || '0', 10);
        document.getElementById('highVal').textContent = highScore;

        let player = { x: canvas.width / 2, y: canvas.height - 40, w: 30, h: 30 };
        let bullets = [];
        let enemies = [];
        let enemyTimer = 0;

        function fire() {
            bullets.push({ x: player.x, y: player.y - 10, r: 4 });
            if (window.AndroidBridge) AndroidBridge.vibrate(25);
        }

        document.getElementById('btnFire').addEventListener('pointerdown', fire);
        let moveLeft = false, moveRight = false;
        document.getElementById('btnLeft').addEventListener('pointerdown', () => moveLeft = true);
        document.getElementById('btnLeft').addEventListener('pointerup', () => moveLeft = false);
        document.getElementById('btnRight').addEventListener('pointerdown', () => moveRight = true);
        document.getElementById('btnRight').addEventListener('pointerup', () => moveRight = false);

        canvas.addEventListener('pointermove', (e) => {
            const rect = canvas.getBoundingClientRect();
            player.x = e.clientX - rect.left;
        });

        function update() {
            if (moveLeft && player.x > 20) player.x -= 6;
            if (moveRight && player.x < canvas.width - 20) player.x += 6;

            bullets.forEach((b, i) => {
                b.y -= 7;
                if (b.y < -10) bullets.splice(i, 1);
            });

            enemyTimer++;
            if (enemyTimer % 45 === 0) {
                enemies.push({ x: Math.random() * (canvas.width - 30) + 15, y: -20, r: 16 });
            }

            enemies.forEach((e, ei) => {
                e.y += 2.5;
                bullets.forEach((b, bi) => {
                    let dist = Math.hypot(e.x - b.x, e.y - b.y);
                    if (dist < e.r + b.r) {
                        enemies.splice(ei, 1);
                        bullets.splice(bi, 1);
                        score += 10;
                        document.getElementById('scoreVal').textContent = score;
                        if (score > highScore) {
                            highScore = score;
                            localStorage.setItem('sb_high', highScore);
                            document.getElementById('highVal').textContent = highScore;
                        }
                        if (window.AndroidBridge) AndroidBridge.vibrate(60);
                    }
                });
                if (e.y > canvas.height + 20) enemies.splice(ei, 1);
            });
        }

        function draw() {
            ctx.fillStyle = '#020617';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw player
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.moveTo(player.x, player.y - 16);
            ctx.lineTo(player.x - 14, player.y + 14);
            ctx.lineTo(player.x + 14, player.y + 14);
            ctx.closePath();
            ctx.fill();

            // Draw bullets
            ctx.fillStyle = '#f59e0b';
            bullets.forEach(b => {
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw enemies
            ctx.fillStyle = '#ef4444';
            enemies.forEach(e => {
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function loop() {
            update();
            draw();
            requestAnimationFrame(loop);
        }
        loop();
    </script>
</body>
</html>`
    },
    business: {
        appName: "ApexConsult",
        packageName: "com.apexconsult.app",
        primaryColor: "#0f766e",
        accentColor: "#14b8a6",
        iconGlyph: "💼",
        gradStart: "#0f766e",
        gradEnd: "#115e59",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apex Consult</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, system-ui, sans-serif; }
        body { background: #f8fafc; color: #1e293b; padding-bottom: 70px; }
        .hero { background: linear-gradient(135deg, #0f766e, #134e4a); color: white; padding: 30px 20px; text-align: center; }
        .hero h1 { font-size: 22px; margin-bottom: 8px; }
        .hero p { font-size: 13px; opacity: 0.9; line-height: 1.4; }
        .cta-btn { display: inline-block; background: #14b8a6; color: white; padding: 10px 24px; border-radius: 20px; text-decoration: none; font-weight: bold; margin-top: 16px; font-size: 13px; border: none; cursor: pointer; }
        .section-title { font-size: 15px; font-weight: bold; margin: 20px 16px 10px; color: #334155; }
        .service-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 16px; }
        .service-card { background: white; padding: 14px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .service-card h4 { font-size: 13px; margin: 6px 0; }
        .service-card p { font-size: 11px; color: #64748b; line-height: 1.35; }
        .contact-box { background: white; margin: 16px; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .form-input { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; }
    </style>
</head>
<body>
    <div class="hero">
        <h1>💼 Apex Business Advisors</h1>
        <p>Accelerating digital transformation, corporate strategy, and business growth.</p>
        <button class="cta-btn" onclick="callWhatsApp()">💬 Free Consultation via WhatsApp</button>
    </div>
    <div class="section-title">Our Premium Services</div>
    <div class="service-grid">
        <div class="service-card">
            <span style="font-size: 22px;">📊</span>
            <h4>Strategic Planning</h4>
            <p>Market analysis, competitive research & growth roadmaps.</p>
        </div>
        <div class="service-card">
            <span style="font-size: 22px;">💡</span>
            <h4>Digital Solutions</h4>
            <p>Custom mobile apps, automation & enterprise cloud migration.</p>
        </div>
        <div class="service-card">
            <span style="font-size: 22px;">🛡️</span>
            <h4>Cyber & Risk Audit</h4>
            <p>ISO certification, security audits and enterprise protection.</p>
        </div>
        <div class="service-card">
            <span style="font-size: 22px;">📈</span>
            <h4>Financial Advisory</h4>
            <p>Capital structure, valuation & investment readiness.</p>
        </div>
    </div>
    <div class="section-title">Request a Quick Callback</div>
    <div class="contact-box">
        <input type="text" class="form-input" id="clientName" placeholder="Your Full Name">
        <input type="tel" class="form-input" id="clientPhone" placeholder="Mobile / WhatsApp Number">
        <button class="cta-btn" style="width: 100%; border-radius: 8px;" onclick="submitInquiry()">📩 Submit Inquiry</button>
    </div>
    <script>
        function callWhatsApp() {
            let url = "https://wa.me/?text=" + encodeURIComponent("Hello Apex Team, I would like to schedule a business strategy call.");
            if (window.AndroidBridge) {
                AndroidBridge.openExternal(url);
            } else {
                window.open(url, '_blank');
            }
        }
        function submitInquiry() {
            let name = document.getElementById('clientName').value.trim();
            if (!name) {
                alert("Please enter your name");
                return;
            }
            if (window.AndroidBridge) {
                AndroidBridge.showToast("Thank you " + name + "! We will contact you soon.");
                AndroidBridge.vibrate(80);
            } else {
                alert("Thank you " + name + "! Inquiry received.");
            }
            document.getElementById('clientName').value = '';
            document.getElementById('clientPhone').value = '';
        }
    </script>
</body>
</html>`
    },
    music: {
        appName: "VibeBeat",
        packageName: "com.vibebeat.audio",
        primaryColor: "#ec4899",
        accentColor: "#a855f7",
        iconGlyph: "🎵",
        gradStart: "#ec4899",
        gradEnd: "#be185d",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VibeBeat Player</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, system-ui, sans-serif; }
        body { background: #0f172a; color: white; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 24px 20px; text-align: center; }
        .top-bar { width: 100%; display: flex; justify-content: space-between; font-size: 13px; color: #94a3b8; }
        .vinyl-disc { width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, #334155 35%, #020617 70%); border: 8px solid #1e293b; box-shadow: 0 15px 35px rgba(236, 72, 153, 0.25); display: flex; align-items: center; justify-content: center; font-size: 3rem; margin: 20px auto; transition: transform 0.5s; }
        .vinyl-disc.playing { animation: spinDisc 6s linear infinite; }
        @keyframes spinDisc { 100% { transform: rotate(360deg); } }
        .track-title { font-size: 18px; font-weight: bold; margin-bottom: 4px; }
        .track-artist { font-size: 13px; color: #ec4899; }
        .progress-box { width: 100%; margin: 20px 0; }
        .progress-bar { width: 100%; height: 6px; background: #334155; border-radius: 3px; overflow: hidden; cursor: pointer; }
        .progress-fill { width: 42%; height: 100%; background: linear-gradient(90deg, #ec4899, #a855f7); }
        .time-labels { display: flex; justify-content: space-between; font-size: 11px; color: #64748b; margin-top: 6px; }
        .controls { display: flex; align-items: center; gap: 24px; }
        .ctrl-btn { background: transparent; border: none; font-size: 24px; cursor: pointer; color: white; }
        .play-btn { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4); }
    </style>
</head>
<body>
    <div class="top-bar">
        <span>PLAYING FROM PLAYLIST</span>
        <span>🎧 Stereo</span>
    </div>
    <div class="vinyl-disc" id="disc">🎵</div>
    <div>
        <div class="track-title" id="trackName">Midnight Neon Waves</div>
        <div class="track-artist">Cyber Dreamer • Chillhop Beats</div>
    </div>
    <div class="progress-box">
        <div class="progress-bar" onclick="seek(event)">
            <div class="progress-fill" id="progFill"></div>
        </div>
        <div class="time-labels">
            <span id="curTime">1:45</span>
            <span>3:50</span>
        </div>
    </div>
    <div class="controls">
        <button class="ctrl-btn" onclick="prevTrack()">⏮️</button>
        <button class="ctrl-btn play-btn" id="playBtn" onclick="togglePlay()">▶</button>
        <button class="ctrl-btn" onclick="nextTrack()">⏭️</button>
    </div>
    <script>
        let isPlaying = false;
        function togglePlay() {
            isPlaying = !isPlaying;
            document.getElementById('disc').classList.toggle('playing', isPlaying);
            document.getElementById('playBtn').textContent = isPlaying ? '⏸' : '▶';
            if (window.AndroidBridge) {
                AndroidBridge.showToast(isPlaying ? "Now Playing 🎵" : "Paused ⏸");
                AndroidBridge.vibrate(40);
            }
        }
        function nextTrack() {
            document.getElementById('trackName').textContent = "Solar Flares & Ambient Skies";
            if (window.AndroidBridge) AndroidBridge.showToast("Skipped to next track");
        }
        function prevTrack() {
            document.getElementById('trackName').textContent = "Echoes in the Rain";
            if (window.AndroidBridge) AndroidBridge.showToast("Previous track");
        }
    </script>
</body>
</html>`
    },
    tasks: {
        appName: "TaskMaster",
        packageName: "com.taskmaster.todo",
        primaryColor: "#6366f1",
        accentColor: "#10b981",
        iconGlyph: "📋",
        gradStart: "#6366f1",
        gradEnd: "#4f46e5",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskMaster Pro</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, system-ui, sans-serif; }
        body { background: #f8fafc; color: #1e293b; padding-bottom: 60px; }
        .app-bar { background: #6366f1; color: white; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; }
        .input-box { padding: 14px 16px; background: white; border-bottom: 1px solid #e2e8f0; display: flex; gap: 8px; }
        .task-input { flex: 1; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; outline: none; }
        .btn-add { background: #6366f1; color: white; border: none; padding: 10px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; }
        .task-list { padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
        .task-card { background: white; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; }
        .task-card.done .task-text { text-decoration: line-through; color: #94a3b8; }
        .task-left { display: flex; align-items: center; gap: 10px; }
        .chk-circle { width: 22px; height: 22px; border: 2px solid #6366f1; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .task-card.done .chk-circle { background: #10b981; border-color: #10b981; color: white; font-size: 12px; }
        .del-btn { background: transparent; border: none; color: #ef4444; font-size: 16px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="app-bar">
        <h3 style="font-size: 16px;">📋 TaskMaster Pro</h3>
        <span id="counter" style="font-size: 12px; background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 12px;">0 Done</span>
    </div>
    <div class="input-box">
        <input type="text" id="newTask" class="task-input" placeholder="What needs to be done today?">
        <button class="btn-add" onclick="addTask()">+ Add</button>
    </div>
    <div class="task-list" id="taskList"></div>
    <script>
        let tasks = JSON.parse(localStorage.getItem('tm_tasks') || '[]');
        if (tasks.length === 0) {
            tasks = [
                { id: 1, text: "Welcome to your Android Task App! 🎉", done: false },
                { id: 2, text: "Tap circle to complete tasks", done: true }
            ];
        }
        function save() {
            localStorage.setItem('tm_tasks', JSON.stringify(tasks));
            render();
        }
        function addTask() {
            let input = document.getElementById('newTask');
            let text = input.value.trim();
            if (!text) return;
            tasks.unshift({ id: Date.now(), text, done: false });
            input.value = '';
            save();
            if (window.AndroidBridge) {
                AndroidBridge.showToast("Task added! 📝");
                AndroidBridge.vibrate(30);
            }
        }
        function toggleTask(id) {
            let t = tasks.find(x => x.id === id);
            if (t) {
                t.done = !t.done;
                save();
                if (window.AndroidBridge) AndroidBridge.vibrate(20);
            }
        }
        function deleteTask(id) {
            tasks = tasks.filter(x => x.id !== id);
            save();
        }
        function render() {
            let container = document.getElementById('taskList');
            container.innerHTML = '';
            let doneCount = tasks.filter(t => t.done).length;
            document.getElementById('counter').textContent = doneCount + "/" + tasks.length + " Done";
            tasks.forEach(t => {
                let div = document.createElement('div');
                div.className = 'task-card' + (t.done ? ' done' : '');
                div.innerHTML = \`
                    <div class="task-left">
                        <div class="chk-circle" onclick="toggleTask(\${t.id})">\${t.done ? '✓' : ''}</div>
                        <span class="task-text">\${t.text}</span>
                    </div>
                    <button class="del-btn" onclick="deleteTask(\${t.id})">✕</button>
                \`;
                container.appendChild(div);
            });
        }
        render();
    </script>
</body>
</html>`
    },
    chat: {
        appName: "NexusChat",
        packageName: "com.nexuschat.messenger",
        primaryColor: "#0284c7",
        accentColor: "#38bdf8",
        iconGlyph: "🤖",
        gradStart: "#0284c7",
        gradEnd: "#0369a1",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NexusChat Mobile</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, sans-serif; }
        body { background: #f0f2f5; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .chat-header { background: #0284c7; color: white; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
        .user-info { display: flex; align-items: center; gap: 10px; }
        .avatar { width: 38px; height: 38px; border-radius: 50%; background: #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 2px solid white; }
        .user-name { font-weight: 700; font-size: 15px; }
        .status-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; display: inline-block; margin-right: 4px; }
        .chat-messages { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
        .msg { max-width: 80%; padding: 10px 14px; border-radius: 16px; font-size: 13px; line-height: 1.4; animation: pop 0.2s ease; word-break: break-word; }
        @keyframes pop { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .msg.bot { background: white; align-self: flex-start; border-bottom-left-radius: 4px; color: #1e293b; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .msg.user { background: #0284c7; color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
        .msg-time { font-size: 10px; opacity: 0.7; margin-top: 4px; text-align: right; }
        .chat-input-bar { background: white; padding: 10px 14px; display: flex; gap: 8px; align-items: center; border-top: 1px solid #e2e8f0; }
        .chat-input { flex: 1; border: 1px solid #cbd5e1; border-radius: 20px; padding: 8px 14px; font-size: 13px; outline: none; }
        .send-btn { background: #0284c7; color: white; border: none; width: 38px; height: 38px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .typing { font-size: 11px; color: #64748b; font-style: italic; margin-left: 16px; display: none; }
    </style>
</head>
<body>
    <div class="chat-header">
        <div class="user-info">
            <div class="avatar">🤖</div>
            <div>
                <div class="user-name">Nexus Assistant</div>
                <div style="font-size: 11px; opacity: 0.9;"><span class="status-dot"></span>Online • Always ready</div>
            </div>
        </div>
        <span onclick="clearChat()" style="cursor: pointer; font-size: 12px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 12px;">Clear</span>
    </div>
    <div class="chat-messages" id="msgBox">
        <div class="msg bot">
            👋 Hello! I'm your mobile smart assistant. How can I assist you today?
            <div class="msg-time">Just now</div>
        </div>
    </div>
    <div class="typing" id="typingIndicator">Nexus is typing...</div>
    <div class="chat-input-bar">
        <input type="text" id="chatInput" class="chat-input" placeholder="Type a message..." onkeydown="if(event.key==='Enter') sendMsg()">
        <button class="send-btn" onclick="sendMsg()">➤</button>
    </div>
    <script>
        const replies = [
            "I'm syncing with your mobile device now! ⚡",
            "That's fantastic! Your app is fully responsive on Android.",
            "You can test haptic feedback and native toasts via AndroidBridge! 🚀",
            "Order confirmed! Would you like a tracking notification? 📦",
            "I have updated your settings successfully."
        ];
        function sendMsg() {
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            if(!text) return;
            addMsg(text, 'user');
            input.value = '';
            if (window.AndroidBridge) AndroidBridge.vibrate(25);
            
            const typing = document.getElementById('typingIndicator');
            typing.style.display = 'block';
            setTimeout(() => {
                typing.style.display = 'none';
                const rep = replies[Math.floor(Math.random() * replies.length)];
                addMsg(rep, 'bot');
                if (window.AndroidBridge) {
                    AndroidBridge.vibrate(40);
                    AndroidBridge.showToast("New message received 💬");
                }
            }, 750);
        }
        function addMsg(txt, sender) {
            const box = document.getElementById('msgBox');
            const d = document.createElement('div');
            d.className = 'msg ' + sender;
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            d.innerHTML = txt + '<div class="msg-time">' + time + '</div>';
            box.appendChild(d);
            box.scrollTop = box.scrollHeight;
        }
        function clearChat() {
            document.getElementById('msgBox').innerHTML = '<div class="msg bot">Chat history cleared! 👋<div class="msg-time">Just now</div></div>';
        }
    </script>
</body>
</html>`
    },
    quiz: {
        appName: "BrainQuest",
        packageName: "com.brainquest.trivia",
        primaryColor: "#f59e0b",
        accentColor: "#10b981",
        iconGlyph: "🎯",
        gradStart: "#f59e0b",
        gradEnd: "#d97706",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BrainQuest Trivia</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, sans-serif; }
        body { background: #0f172a; color: white; min-height: 100vh; padding: 20px 16px; display: flex; flex-direction: column; justify-content: space-between; }
        .top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .score-badge { background: #1e293b; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: bold; border: 1px solid #334155; }
        .timer-track { width: 100%; height: 6px; background: #1e293b; border-radius: 3px; overflow: hidden; margin-bottom: 20px; }
        .timer-fill { height: 100%; background: #f59e0b; width: 100%; transition: width 0.2s linear; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 24px 18px; margin-bottom: 20px; }
        .q-num { font-size: 12px; color: #f59e0b; font-weight: 700; text-transform: uppercase; margin-bottom: 6px; }
        .q-text { font-size: 17px; font-weight: 700; line-height: 1.4; }
        .options { display: flex; flex-direction: column; gap: 10px; }
        .opt-btn { background: #334155; color: white; border: 2px solid transparent; padding: 14px 16px; border-radius: 12px; font-size: 14px; font-weight: 600; text-align: left; cursor: pointer; transition: all 0.2s; }
        .opt-btn.correct { background: #065f46; border-color: #10b981; }
        .opt-btn.wrong { background: #7f1d1d; border-color: #ef4444; }
    </style>
</head>
<body>
    <div>
        <div class="top-row">
            <span style="font-weight: 800; font-size: 18px;">🎯 BrainQuest</span>
            <div class="score-badge">SCORE: <span id="score" style="color: #10b981;">0</span></div>
        </div>
        <div class="timer-track"><div class="timer-fill" id="timerBar"></div></div>
        <div class="card">
            <div class="q-num" id="qNum">Question 1 of 5</div>
            <div class="q-text" id="qText">Loading question...</div>
        </div>
        <div class="options" id="optContainer"></div>
    </div>
    <div style="text-align: center; font-size: 12px; color: #64748b; margin-top: 20px;">
        High Score: <span id="highScore" style="color: #f59e0b;">0</span>
    </div>
    <script>
        const questions = [
            { q: "What is the official programming language for Android native development?", o: ["Kotlin", "Swift", "Ruby", "PHP"], a: 0 },
            { q: "Which Android component displays web pages directly inside apps?", o: ["SurfaceView", "WebView", "FrameView", "TextView"], a: 1 },
            { q: "What is the highest layer of the Android app architecture?", o: ["Kernel", "HAL", "Applications & UI", "Native Libraries"], a: 2 },
            { q: "What file declares Android app permissions and launcher activities?", o: ["settings.gradle", "AndroidManifest.xml", "strings.xml", "res.json"], a: 1 },
            { q: "What bridge interface connects JavaScript to native Android code?", o: ["AndroidBridge", "AppConnect", "NetSocket", "IntentBus"], a: 0 }
        ];
        let cur = 0, score = 0, locked = false;
        let high = parseInt(localStorage.getItem('bq_high') || '0', 10);
        document.getElementById('highScore').textContent = high;

        function loadQuestion() {
            if (cur >= questions.length) {
                document.getElementById('qText').textContent = "🎉 Quiz Complete! Final Score: " + score;
                document.getElementById('optContainer').innerHTML = '<button class="opt-btn" style="text-align:center; background:#10b981;" onclick="restart()">🔄 Play Again</button>';
                return;
            }
            locked = false;
            const q = questions[cur];
            document.getElementById('qNum').textContent = "Question " + (cur + 1) + " of " + questions.length;
            document.getElementById('qText').textContent = q.q;
            const container = document.getElementById('optContainer');
            container.innerHTML = '';
            q.o.forEach((opt, idx) => {
                const b = document.createElement('button');
                b.className = 'opt-btn';
                b.textContent = opt;
                b.onclick = () => answer(idx, b);
                container.appendChild(b);
            });
        }
        function answer(idx, btn) {
            if (locked) return;
            locked = true;
            const q = questions[cur];
            if (idx === q.a) {
                btn.classList.add('correct');
                score += 10;
                document.getElementById('score').textContent = score;
                if (score > high) { high = score; localStorage.setItem('bq_high', high); document.getElementById('highScore').textContent = high; }
                if (window.AndroidBridge) { AndroidBridge.vibrate(50); AndroidBridge.showToast("Correct! +10 Points ⭐"); }
            } else {
                btn.classList.add('wrong');
                if (window.AndroidBridge) AndroidBridge.vibrate(120);
            }
            setTimeout(() => { cur++; loadQuestion(); }, 900);
        }
        function restart() { cur = 0; score = 0; document.getElementById('score').textContent = 0; loadQuestion(); }
        loadQuestion();
    </script>
</body>
</html>`
    }
};

function loadTemplate(tplKey) {
    const tpl = appTemplates[tplKey];
    if (!tpl) return;

    uploadedZipFiles = null;
    revokeUploadedZipBlobUrls();

    // Ensure we switch to Code Editor mode
    currentSourceMode = 'editor';
    const editorTabBtn = document.querySelector('.tabs .tab:first-child');
    document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    if (editorTabBtn) editorTabBtn.classList.add('active');
    const editorTab = document.getElementById('editor-tab');
    if (editorTab) editorTab.classList.add('active');

    // Highlight the active template card
    document.querySelectorAll('.template-card').forEach(card => {
        const onclickAttr = card.getAttribute('onclick') || '';
        card.classList.toggle('active', onclickAttr.includes(`'${tplKey}'`));
    });

    document.getElementById('appName').value = tpl.appName;
    document.getElementById('packageName').value = tpl.packageName;
    document.getElementById('primaryColor').value = tpl.primaryColor;
    document.getElementById('primaryColorText').value = tpl.primaryColor;
    document.getElementById('accentColor').value = tpl.accentColor;
    document.getElementById('accentColorText').value = tpl.accentColor;
    document.getElementById('appIcon').value = tpl.iconGlyph;
    document.getElementById('splashText').value = tpl.appName;
    document.getElementById('htmlEditor').value = tpl.code;

    iconGlyph = tpl.iconGlyph;
    iconGradStart = tpl.gradStart;
    iconGradEnd = tpl.gradEnd;
    customIconBase64 = null;

    // Highlight active glyph button if matching
    document.querySelectorAll('.glyph-btn').forEach(b => {
        b.classList.toggle('active', b.textContent.trim() === tpl.iconGlyph);
    });

    updateIconCanvas();
    updatePreviews(true);
    updateFileStructure(tpl.packageName);
    showNotification(`✨ Loaded ${tpl.appName} template!`, 2500);
}

// Visual UI Component Inserter
function insertComponent(type) {
    if (typeof switchWizardStage === 'function') switchWizardStage(1);
    currentSourceMode = 'editor';
    const editorTabBtn = document.querySelector('.tabs .tab:first-child');
    document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    if (editorTabBtn) editorTabBtn.classList.add('active');
    const editorTab = document.getElementById('editor-tab');
    if (editorTab) editorTab.classList.add('active');

    const editor = document.getElementById('htmlEditor');
    let snippet = '';

    switch(type) {
        case 'appbar':
            snippet = `
<!-- Mobile Top App Bar -->
<div style="background: #10b981; color: white; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 18px; cursor: pointer;">☰</span>
        <span style="font-weight: bold; font-size: 16px;">App Title</span>
    </div>
    <span style="font-size: 18px; cursor: pointer;">🔍</span>
</div>
`;
            break;
        case 'hero':
            snippet = `
<!-- Mobile Hero Promo Card -->
<div style="margin: 14px 16px; background: linear-gradient(135deg, #10b981, #06b6d4); color: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 14px rgba(16,185,129,0.3);">
    <span style="font-size: 11px; background: rgba(255,255,255,0.25); padding: 3px 8px; border-radius: 9999px; font-weight: bold;">SPECIAL BANNER</span>
    <h2 style="font-size: 19px; margin-top: 6px;">Welcome to Your App</h2>
    <p style="font-size: 12px; opacity: 0.9; margin-top: 4px;">Discover unique features and experience high-speed native mobile performance.</p>
</div>
`;
            break;
        case 'cards':
            snippet = `
<!-- 2-Column Responsive Card Grid -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 16px; margin: 12px 0;">
    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
        <span style="font-size: 24px;">⚡</span>
        <h4 style="font-size: 14px; margin: 6px 0 2px;">Fast Loading</h4>
        <p style="font-size: 11px; color: #64748b;">Instant cache & smooth WebView experience.</p>
    </div>
    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
        <span style="font-size: 24px;">🛡️</span>
        <h4 style="font-size: 14px; margin: 6px 0 2px;">Offline Ready</h4>
        <p style="font-size: 11px; color: #64748b;">Local storage and automatic offline screen.</p>
    </div>
</div>
`;
            break;
        case 'fab':
            snippet = `
<!-- Floating Action Button (FAB) -->
<button onclick="if(window.AndroidBridge){ AndroidBridge.showToast('FAB Clicked! 🚀'); } else { alert('FAB Clicked!'); }" style="position: fixed; bottom: 20px; right: 20px; width: 52px; height: 52px; border-radius: 50%; background: #10b981; color: white; border: none; font-size: 24px; box-shadow: 0 6px 18px rgba(16,185,129,0.4); cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 100;">
    +
</button>
`;
            break;
        case 'whatsapp':
            snippet = `
<!-- WhatsApp Floating Support Widget -->
<a href="https://wa.me/?text=Hello%20Support" target="_blank" onclick="if(window.AndroidBridge){ AndroidBridge.openExternal('https://wa.me/?text=Hello%20Support'); return false; }" style="position: fixed; bottom: 20px; left: 20px; background: #25d366; color: white; padding: 10px 16px; border-radius: 25px; text-decoration: none; font-size: 13px; font-weight: bold; box-shadow: 0 4px 14px rgba(37,211,102,0.4); display: flex; align-items: center; gap: 6px; z-index: 100;">
    <span>💬</span> WhatsApp Support
</a>
`;
            break;
        case 'bridge':
            snippet = `
<!-- Native Android JavaScript Bridge Demo Buttons -->
<div style="margin: 16px; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; text-align: center;">
    <h4 style="font-size: 13px; margin-bottom: 8px;">Native Android Bridge Features</h4>
    <div style="display: flex; gap: 6px; flex-wrap: wrap; justify-content: center;">
        <button onclick="AndroidBridge.showToast('Hello from Web! 👋')" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: white; font-size: 11px; cursor: pointer;">🔔 Show Toast</button>
        <button onclick="AndroidBridge.vibrate(100)" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: white; font-size: 11px; cursor: pointer;">📳 Vibrate</button>
        <button onclick="AndroidBridge.shareText('Check out this app!', 'Share App')" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: white; font-size: 11px; cursor: pointer;">📤 Share</button>
        <button onclick="AndroidBridge.copyToClipboard('COUPON-2026')" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: white; font-size: 11px; cursor: pointer;">📋 Copy</button>
    </div>
</div>
`;
            break;
    }

    if (snippet) {
        let cur = editor.value;
        if (cur.includes('</body>')) {
            editor.value = cur.replace('</body>', snippet + '\n</body>');
        } else {
            editor.value = cur + '\n' + snippet;
        }
        updatePreview();
        showNotification("➕ Component inserted into code editor!", 2500);
    }
}

// Icon Canvas Studio
function updateIconCanvas() {
    const canvas = document.getElementById('iconPreviewCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (customIconBase64) {
        const img = new Image();
        img.onload = function() {
            ctx.save();
            drawIconShapePath(ctx, w, h, iconShape);
            ctx.clip();
            ctx.drawImage(img, 0, 0, w, h);
            ctx.restore();
        };
        img.src = customIconBase64;
        return;
    }

    ctx.save();
    drawIconShapePath(ctx, w, h, iconShape);
    ctx.clip();

    // Fill background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, iconGradStart);
    grad.addColorStop(1, iconGradEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle inner highlight
    const radial = ctx.createRadialGradient(w/2, h/3, 10, w/2, h/2, w);
    radial.addColorStop(0, 'rgba(255,255,255,0.25)');
    radial.addColorStop(1, 'rgba(0,0,0,0.15)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w, h);

    ctx.restore();

    // Draw Glyph or Text
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';

    const text = iconGlyph || document.getElementById('appIcon').value || '⚡';
    if (text.length > 1) {
        ctx.font = 'bold 64px -apple-system, sans-serif';
    } else {
        ctx.font = '84px -apple-system, sans-serif';
    }

    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.fillText(text, w / 2, h / 2 + (text.length > 1 ? 4 : 2));
    ctx.restore();
}

function drawIconShapePath(ctx, w, h, shape) {
    ctx.beginPath();
    if (shape === 'circle') {
        ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2);
    } else if (shape === 'squircle' || shape === 'rounded') {
        const r = shape === 'squircle' ? w * 0.28 : w * 0.18;
        if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(4, 4, w - 8, h - 8, r);
        } else {
            const x = 4, y = 4, rw = w - 8, rh = h - 8;
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + rw, y, x + rw, y + rh, r);
            ctx.arcTo(x + rw, y + rh, x, y + rh, r);
            ctx.arcTo(x, y + rh, x, y, r);
            ctx.arcTo(x, y, x + rw, y, r);
        }
    } else {
        // square
        ctx.rect(4, 4, w - 8, h - 8);
    }
    ctx.closePath();
}

function setIconShape(shape) {
    iconShape = shape;
    document.querySelectorAll('.icon-studio-controls .preview-btn').forEach(b => b.classList.remove('active'));
    if (shape === 'squircle') document.getElementById('shapeSquircleBtn').classList.add('active');
    if (shape === 'circle') document.getElementById('shapeCircleBtn').classList.add('active');
    if (shape === 'rounded') document.getElementById('shapeRoundBtn').classList.add('active');
    if (shape === 'square') document.getElementById('shapeSquareBtn').classList.add('active');
    updateIconCanvas();
}

function setIconGradient(start, end) {
    iconGradStart = start;
    iconGradEnd = end;
    customIconBase64 = null;
    updateIconCanvas();
}

function setIconGlyph(glyph) {
    iconGlyph = glyph;
    document.getElementById('appIcon').value = glyph;
    customIconBase64 = null;
    document.querySelectorAll('.glyph-btn').forEach(b => {
        b.classList.toggle('active', b.textContent === glyph);
    });
    updateIconCanvas();
}

function handleCustomIconText(val) {
    iconGlyph = val;
    customIconBase64 = null;
    updateIconCanvas();
}

function downloadIconPng() {
    const canvas = document.getElementById('iconPreviewCanvas');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `ic_launcher_${document.getElementById('appName').value || 'app'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showNotification("📥 Icon downloaded as PNG!", 2000);
}

// Generates ArrayBuffers for Android Mipmap densities
async function generateMipmapPng(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (customIconBase64) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => {
                ctx.save();
                drawIconShapePath(ctx, size, size, iconShape);
                ctx.clip();
                ctx.drawImage(img, 0, 0, size, size);
                ctx.restore();
                canvas.toBlob(blob => {
                    blob.arrayBuffer().then(resolve);
                }, 'image/png');
            };
            img.src = customIconBase64;
        });
    }

    ctx.save();
    drawIconShapePath(ctx, size, size, iconShape);
    ctx.clip();
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, iconGradStart);
    grad.addColorStop(1, iconGradEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    const text = iconGlyph || document.getElementById('appIcon').value || '⚡';
    const fontSize = Math.floor(size * (text.length > 1 ? 0.38 : 0.48));
    ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = Math.max(2, size * 0.04);
    ctx.shadowOffsetY = Math.max(1, size * 0.02);
    ctx.fillText(text, size / 2, size / 2 + Math.max(1, size * 0.02));
    ctx.restore();

    return new Promise(resolve => {
        canvas.toBlob(blob => {
            blob.arrayBuffer().then(resolve);
        }, 'image/png');
    });
}

// Modal management
function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
}

function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
}

// Source Tab Switching
function switchSourceTab(clickedTab, tabName) {
    document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    clickedTab.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
    currentSourceMode = tabName;
    updatePreviews();
    updateQrCode();
    updateFileStructure(document.getElementById('packageName').value);
}

// Upload Handler
async function handleFileUpload(event) {
    const file = event.target.files[0];
    const statusDiv = document.getElementById('uploadStatus');
    if (!file) return;

    if (file.name.endsWith('.zip')) {
        statusDiv.innerHTML = `<span style="color: #0284c7;">⏳ Unpacking ZIP: <strong>${file.name}</strong>...</span>`;
        try {
            const zip = await JSZip.loadAsync(file);
            const rawFiles = {};
            let fileCount = 0;
            const promises = [];

            zip.forEach((relativePath, zipEntry) => {
                if (!zipEntry.dir) {
                    fileCount++;
                    promises.push(
                        zipEntry.async('arraybuffer').then(buf => {
                            rawFiles[relativePath] = buf;
                        })
                    );
                }
            });

            await Promise.all(promises);

            // Auto-detect if index.html is nested inside a parent folder (e.g. zipped folder "Project/index.html")
            let indexKey = Object.keys(rawFiles).find(p => p.toLowerCase() === 'index.html');
            let prefixToStrip = '';

            if (!indexKey) {
                const candidate = Object.keys(rawFiles).find(p => p.toLowerCase().endsWith('/index.html') || p.toLowerCase().endsWith('/index.htm'));
                if (candidate) {
                    const lastSlash = candidate.lastIndexOf('/');
                    prefixToStrip = candidate.substring(0, lastSlash + 1);
                }
            }

            uploadedZipFiles = {};
            revokeUploadedZipBlobUrls();

            for (const [rawPath, buffer] of Object.entries(rawFiles)) {
                if (rawPath.startsWith('__MACOSX/') || rawPath.includes('/.DS_Store')) {
                    continue;
                }
                let cleanPath = rawPath;
                if (prefixToStrip && rawPath.startsWith(prefixToStrip)) {
                    cleanPath = rawPath.substring(prefixToStrip.length);
                }
                if (!cleanPath) continue;

                uploadedZipFiles[cleanPath] = buffer;
            }

            // Create Blob URLs for previewing all assets (CSS, JS, images, fonts)
            for (const [cleanPath, buffer] of Object.entries(uploadedZipFiles)) {
                if (cleanPath.toLowerCase().endsWith('.css') || cleanPath.toLowerCase().endsWith('.html')) continue;
                const mime = getMimeType(cleanPath);
                const blob = new Blob([buffer], { type: mime });
                uploadedZipBlobUrls[cleanPath] = URL.createObjectURL(blob);
            }

            // Resolve CSS files to blob URLs (including background url references)
            for (const [cleanPath, buffer] of Object.entries(uploadedZipFiles)) {
                if (!cleanPath.toLowerCase().endsWith('.css')) continue;
                let cssText = new TextDecoder().decode(buffer);
                for (const [assetPath, blobUrl] of Object.entries(uploadedZipBlobUrls)) {
                    const esc = assetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const cssUrlRegex = new RegExp(`url\\(\\s*["']?(?:\\.\\/|\\/)?(?:[^)]*\\/)?${esc}(?:[?#][^"']*)?["']?\\s*\\)`, 'gi');
                    cssText = cssText.replace(cssUrlRegex, `url("${blobUrl}")`);
                }
                const cssBlob = new Blob([cssText], { type: 'text/css' });
                uploadedZipBlobUrls[cleanPath] = URL.createObjectURL(cssBlob);
            }

            // Load index.html content into the editor
            let foundIndex = false;
            for (const [path, buffer] of Object.entries(uploadedZipFiles)) {
                if (path.toLowerCase() === 'index.html' || path.toLowerCase().endsWith('/index.html')) {
                    const text = new TextDecoder().decode(buffer);
                    document.getElementById('htmlEditor').value = text;
                    foundIndex = true;
                    break;
                }
            }

            const prefixNotice = prefixToStrip ? ` (auto-resolved from folder "${prefixToStrip.replace(/\/$/, '')}")` : '';
            statusDiv.innerHTML = `<span style="color: #10b981; font-weight: 700;">✅ Loaded ZIP with ${fileCount} files${foundIndex ? ' (index.html found)' : ''}!</span>`;
            renderZipFileExplorer();
            updatePreview();
            showNotification(`📦 ${file.name} extracted successfully with ${fileCount} files${prefixNotice}!`, 4000);
        } catch (err) {
            console.error('ZIP read error:', err);
            statusDiv.innerHTML = `<span style="color: #ef4444;">❌ Failed to read ZIP file: ${err.message}</span>`;
            uploadedZipFiles = null;
            revokeUploadedZipBlobUrls();
            renderZipFileExplorer();
        }
    } else {
        uploadedZipFiles = null;
        revokeUploadedZipBlobUrls();
        renderZipFileExplorer();
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('htmlEditor').value = e.target.result;
            statusDiv.innerHTML = `<span style="color: #10b981; font-weight: 700;">✅ Loaded: <strong>${file.name}</strong></span>`;
            updatePreview();
            showNotification(`✅ ${file.name} loaded successfully!`, 3000);
        };
        reader.readAsText(file);
    }
}

// Local Unzipped Folder Upload Handler (via webkitdirectory)
async function handleFolderUpload(event) {
    const files = event.target.files;
    const statusDiv = document.getElementById('uploadStatus');
    if (!files || files.length === 0) return;

    statusDiv.innerHTML = `<span style="color: #0284c7;">⏳ Reading local folder: <strong>${files.length} items</strong>...</span>`;
    try {
        const rawFiles = {};
        const promises = [];

        for (let i = 0; i < files.length; i++) {
            const f = files[i];
            const relativePath = f.webkitRelativePath || f.name;
            promises.push(
                f.arrayBuffer().then(buf => {
                    rawFiles[relativePath] = buf;
                })
            );
        }

        await Promise.all(promises);

        // Auto-detect root directory prefix to strip
        let indexKey = Object.keys(rawFiles).find(p => p.toLowerCase() === 'index.html');
        let prefixToStrip = '';

        if (!indexKey) {
            const candidate = Object.keys(rawFiles).find(p => p.toLowerCase().endsWith('/index.html') || p.toLowerCase().endsWith('/index.htm'));
            if (candidate) {
                const lastSlash = candidate.lastIndexOf('/');
                prefixToStrip = candidate.substring(0, lastSlash + 1);
            }
        }

        uploadedZipFiles = {};
        revokeUploadedZipBlobUrls();

        for (const [rawPath, buffer] of Object.entries(rawFiles)) {
            if (rawPath.startsWith('__MACOSX/') || rawPath.includes('/.DS_Store')) continue;
            let cleanPath = rawPath;
            if (prefixToStrip && rawPath.startsWith(prefixToStrip)) {
                cleanPath = rawPath.substring(prefixToStrip.length);
            }
            if (!cleanPath) continue;
            uploadedZipFiles[cleanPath] = buffer;
        }

        // Generate Blob URLs for assets
        for (const [cleanPath, buffer] of Object.entries(uploadedZipFiles)) {
            if (cleanPath.toLowerCase().endsWith('.css') || cleanPath.toLowerCase().endsWith('.html')) continue;
            const mime = getMimeType(cleanPath);
            uploadedZipBlobUrls[cleanPath] = URL.createObjectURL(new Blob([buffer], { type: mime }));
        }

        for (const [cleanPath, buffer] of Object.entries(uploadedZipFiles)) {
            if (!cleanPath.toLowerCase().endsWith('.css')) continue;
            let cssText = new TextDecoder().decode(buffer);
            for (const [assetPath, blobUrl] of Object.entries(uploadedZipBlobUrls)) {
                const esc = assetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const cssUrlRegex = new RegExp(`url\\(\\s*["']?(?:\\.\\/|\\/)?(?:[^)]*\\/)?${esc}(?:[?#][^"']*)?["']?\\s*\\)`, 'gi');
                cssText = cssText.replace(cssUrlRegex, `url("${blobUrl}")`);
            }
            uploadedZipBlobUrls[cleanPath] = URL.createObjectURL(new Blob([cssText], { type: 'text/css' }));
        }

        let foundIndex = false;
        for (const [path, buffer] of Object.entries(uploadedZipFiles)) {
            if (path.toLowerCase() === 'index.html' || path.toLowerCase().endsWith('/index.html')) {
                const text = new TextDecoder().decode(buffer);
                document.getElementById('htmlEditor').value = text;
                foundIndex = true;
                break;
            }
        }

        statusDiv.innerHTML = `<span style="color: #10b981; font-weight: 700;">✅ Loaded Folder with ${files.length} files${foundIndex ? ' (index.html found)' : ''}!</span>`;
        renderZipFileExplorer();
        updatePreview();
        showNotification(`📁 Folder loaded with ${files.length} files successfully!`, 3500);
    } catch (err) {
        console.error('Folder read error:', err);
        statusDiv.innerHTML = `<span style="color: #ef4444;">❌ Failed to load folder: ${err.message}</span>`;
        uploadedZipFiles = null;
        revokeUploadedZipBlobUrls();
        renderZipFileExplorer();
    }
}

// Extracted Files Explorer Tree
function renderZipFileExplorer() {
    const card = document.getElementById('zipExplorerCard');
    const tree = document.getElementById('zipFileTree');
    if (!card || !tree) return;

    if (!uploadedZipFiles || Object.keys(uploadedZipFiles).length === 0) {
        card.classList.remove('active');
        tree.innerHTML = '';
        return;
    }

    card.classList.add('active');
    tree.innerHTML = '';

    const paths = Object.keys(uploadedZipFiles).sort();
    let totalBytes = 0;
    let cssCount = 0;
    let jsCount = 0;
    let imgCount = 0;

    paths.forEach(p => {
        const buf = uploadedZipFiles[p];
        const bytes = buf ? buf.byteLength : 0;
        totalBytes += bytes;
        const low = p.toLowerCase();
        if (low.endsWith('.css')) cssCount++;
        else if (low.endsWith('.js')) jsCount++;
        else if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(low)) imgCount++;

        const isIndex = low === 'index.html';
        const row = document.createElement('div');
        row.className = 'zip-file-row' + (isIndex ? ' is-index' : '');

        let icon = '📄';
        if (low.endsWith('.html') || low.endsWith('.htm')) icon = '🌐';
        else if (low.endsWith('.css')) icon = '🎨';
        else if (low.endsWith('.js')) icon = '📜';
        else if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(low)) icon = '🖼️';
        else if (/\.(woff2?|ttf|otf)$/.test(low)) icon = '🔤';

        const sizeKb = (bytes / 1024).toFixed(1) + ' KB';
        row.innerHTML = `
            <span class="zip-file-name"><span>${icon}</span> ${p}</span>
            <span class="zip-file-size">${sizeKb}</span>
        `;
        row.title = "Click to inspect in code editor";
        row.onclick = () => loadFileIntoEditor(p);
        tree.appendChild(row);
    });

    document.getElementById('statFiles').textContent = paths.length + " Files";
    const totalKb = (totalBytes / 1024).toFixed(0);
    document.getElementById('statSize').textContent = (totalBytes > 1048576 ? (totalBytes / 1048576).toFixed(1) + " MB" : totalKb + " KB");
    document.getElementById('statCss').textContent = cssCount + " CSS";
    document.getElementById('statJs').textContent = jsCount + " JS";
    document.getElementById('statImg').textContent = imgCount + " Img";
}

function loadFileIntoEditor(path) {
    if (!uploadedZipFiles || !uploadedZipFiles[path]) return;
    const buf = uploadedZipFiles[path];
    const low = path.toLowerCase();
    if (/\.(html|htm|css|js|json|xml|txt|md|svg)$/.test(low)) {
        const text = new TextDecoder().decode(buf);
        document.getElementById('htmlEditor').value = text;
        showNotification(`📄 Loaded "${path}" into editor`, 2000);
    } else {
        showNotification(`ℹ️ "${path}" is binary (${(buf.byteLength / 1024).toFixed(1)} KB)`, 2200);
    }
}

function reloadIndexIntoEditor() {
    if (!uploadedZipFiles) return;
    for (const [p, buf] of Object.entries(uploadedZipFiles)) {
        if (p.toLowerCase() === 'index.html' || p.toLowerCase().endsWith('/index.html')) {
            document.getElementById('htmlEditor').value = new TextDecoder().decode(buf);
            showNotification(`📄 Returned to index.html`, 1800);
            updatePreview();
            break;
        }
    }
}

// Drag & Drop Setup
function initDragAndDrop() {
    const zone = document.getElementById('dropZone');
    if (!zone) return;

    ['dragenter', 'dragover'].forEach(name => {
        zone.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
            zone.classList.add('drag-active');
        });
    });

    ['dragleave', 'drop'].forEach(name => {
        zone.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
            zone.classList.remove('drag-active');
        });
    });

    zone.addEventListener('drop', async (e) => {
        const dt = e.dataTransfer;
        if (!dt || !dt.files || dt.files.length === 0) return;
        const file = dt.files[0];
        if (file.name.endsWith('.zip') || file.name.endsWith('.html') || file.name.endsWith('.htm')) {
            handleFileUpload({ target: { files: dt.files } });
        } else {
            handleFolderUpload({ target: { files: dt.files } });
        }
    });
}

// UI Toggles for New Features
function toggleDeepLinkInputs() {
    const isChecked = document.getElementById('enableDeepLinking').checked;
    document.getElementById('deepLinkInputs').style.display = isChecked ? 'grid' : 'none';
}

function toggleFloatingWidgetInputs() {
    const isChecked = document.getElementById('enableFloatingWidget').checked;
    document.getElementById('floatingWidgetInputs').style.display = isChecked ? 'grid' : 'none';
}

// App Health Doctor / Play Store Audit
function openHealthAuditModal() {
    runHealthAudit();
    openModal('auditModal');
}

function runHealthAudit() {
    const appName = document.getElementById('appName').value.trim();
    const pkgName = document.getElementById('packageName').value.trim();
    const html = document.getElementById('htmlEditor').value;
    const isUrl = currentSourceMode === 'url';
    const webUrl = document.getElementById('webUrl').value.trim();

    const checks = [];
    let score = 100;

    // Check 1: App Name
    if (appName.length >= 2 && appName.length <= 30) {
        checks.push({ status: 'pass', title: 'App Name Validated', desc: `"${appName}" conforms to Google Play character limit (under 30 chars).` });
    } else {
        score -= 15;
        checks.push({ status: 'warn', title: 'App Name Length Warning', desc: 'Google Play recommends an app name between 2 and 30 characters.' });
    }

    // Check 2: Package Name (Application ID)
    const pkgRegex = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/;
    if (pkgRegex.test(pkgName)) {
        checks.push({ status: 'pass', title: 'Package Identifier (Application ID)', desc: `"${pkgName}" is unique and complies with Java package standards.` });
    } else {
        score -= 25;
        checks.push({ status: 'fail', title: 'Invalid Package Name', desc: 'Package name must have at least two segments (e.g., com.company.app) in lowercase.' });
    }

    // Check 3: Responsive Viewport Meta Tag
    if (isUrl) {
        checks.push({ status: 'pass', title: 'Website URL Integration', desc: `Targeting live URL "${webUrl}" with native fallback.` });
    } else {
        if (html.includes('name="viewport"') || html.includes("name='viewport'")) {
            checks.push({ status: 'pass', title: 'Mobile Responsive Viewport Tag', desc: 'HTML contains <meta name="viewport"> for correct DPI scaling on high-res displays.' });
        } else {
            score -= 15;
            checks.push({ status: 'warn', title: 'Missing Viewport Meta Tag', desc: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> in <head> for proper phone scaling.' });
        }
    }

    // Check 4: App Icon Resolution & Shape
    if (customIconBase64) {
        checks.push({ status: 'pass', title: 'Custom App Icon Attached', desc: 'HD custom PNG icon will be compiled for mdpi, hdpi, xhdpi, xxhdpi, and xxxhdpi densities.' });
    } else {
        checks.push({ status: 'pass', title: 'Built-in Icon Studio Preset Active', desc: `Icon configured with shape "${iconShape}" and symbol "${iconGlyph}".` });
    }

    // Check 5: Security & HTTPS
    if (isUrl && !webUrl.startsWith('https://')) {
        score -= 15;
        checks.push({ status: 'warn', title: 'Cleartext HTTP URL Warning', desc: 'Google Play requires HTTPS endpoints. Consider using https://.' });
    } else {
        checks.push({ status: 'pass', title: 'Security & Protocol Integrity', desc: 'App complies with modern Android cleartext and permission policies.' });
    }

    // Check 6: Native Android Bridge
    const bridgeOn = document.getElementById('enableBridge').checked;
    if (bridgeOn) {
        checks.push({ status: 'pass', title: 'Native JavaScript Bridge (AndroidBridge)', desc: 'Enabled for Toasts, Haptic Vibrate, Battery, Share Sheet, and Device Hardware.' });
    } else {
        checks.push({ status: 'pass', title: 'Native JavaScript Bridge', desc: 'Bridge disabled; running in isolated WebView mode.' });
    }

    // Update UI
    score = Math.max(20, Math.min(100, score));
    const scoreNum = document.getElementById('auditScoreNum');
    const heading = document.getElementById('auditStatusHeading');
    const sub = document.getElementById('auditStatusSub');
    const list = document.getElementById('auditChecklist');

    if (scoreNum) scoreNum.textContent = score + "%";
    if (heading) {
        if (score >= 90) {
            heading.textContent = "Excellent! App is 100% Ready for Build";
            heading.style.color = "#065f46";
            if (sub) sub.textContent = "All security, responsive viewport, assets, and Android configuration rules passed.";
        } else if (score >= 70) {
            heading.textContent = "Good, with minor recommendations";
            heading.style.color = "#d97706";
            if (sub) sub.textContent = "Your app can build, but review the warnings below for optimal Play Store submission.";
        } else {
            heading.textContent = "Configuration Needs Attention";
            heading.style.color = "#dc2626";
            if (sub) sub.textContent = "Please fix the red issues below before compiling your APK.";
        }
    }

    if (list) {
        list.innerHTML = checks.map(c => `
            <div class="audit-check-item ${c.status}">
                <span class="audit-status-icon">${c.status === 'pass' ? '✅' : (c.status === 'warn' ? '⚠️' : '❌')}</span>
                <div>
                    <strong>${c.title}</strong>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 2px;">${c.desc}</div>
                </div>
            </div>
        `).join('');
    }
}

function handleIconUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            customIconBase64 = e.target.result;
            updateIconCanvas();
            updatePreviews();
        };
        reader.readAsDataURL(file);
    } else {
        customIconBase64 = null;
        updateIconCanvas();
        updatePreviews();
    }
}

function handleSplashUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            customSplashBase64 = e.target.result;
            updatePreviews();
        };
        reader.readAsDataURL(file);
    } else {
        customSplashBase64 = null;
        updatePreviews();
    }
}

function syncColorPicker(textInput, colorPickerId, update = false) {
    const colorValue = textInput.value;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(colorValue)) {
        document.getElementById(colorPickerId).value = colorValue;
        if (colorPickerId === 'primaryColor') {
            iconGradStart = colorValue;
            updateIconCanvas();
        }
        if (update) updatePreviews(true);
    }
}

function renderSplashPreview() {
    const splashPreviewEl = document.getElementById('splashPreview');
    if (!splashPreviewEl) return;
    const isSplashEnabled = document.getElementById('enableSplash')?.checked;
    if (!isSplashEnabled) {
        splashPreviewEl.innerHTML = '';
        return;
    }
    const splashText = document.getElementById('splashText')?.value || document.getElementById('appName')?.value || 'MyMobileApp';
    const primaryColor = document.getElementById('primaryColor')?.value || '#10b981';
    const icon = iconGlyph || document.getElementById('appIcon')?.value || '⚡';
    
    splashPreviewEl.style.cssText = `background: ${primaryColor}; border-radius: 12px; padding: 20px; text-align: center; color: white; margin-top: 10px; box-shadow: inset 0 0 20px rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 130px;`;
    
    if (customSplashBase64) {
        splashPreviewEl.innerHTML = `<img src="${customSplashBase64}" style="max-height: 70px; max-width: 100%; border-radius: 8px; margin-bottom: 8px; object-fit: contain;" alt="Splash"/><strong style="font-size: 1.1rem; color: white;">${splashText}</strong>`;
    } else {
        splashPreviewEl.innerHTML = `<div style="font-size: 2.2rem; margin-bottom: 6px;">${icon}</div><strong style="font-size: 1.15rem; color: white; letter-spacing: 0.5px;">${splashText}</strong><span style="font-size: 0.75rem; opacity: 0.85; margin-top: 4px;">Native Launch Screen Preview</span>`;
    }
}

function toggleSplash() {
    const splashConfig = document.getElementById('splashConfig');
    if (splashConfig) {
        splashConfig.style.display = document.getElementById('enableSplash').checked ? 'block' : 'none';
    }
    renderSplashPreview();
    updatePreviews();
}

function toggleBottomNavBuilder() {
    const isChecked = document.getElementById('enableBottomNav').checked;
    document.getElementById('bottomNavBuilder').style.display = isChecked ? 'block' : 'none';
    document.getElementById('phoneBottomNav').style.display = isChecked ? 'flex' : 'none';
    updateBottomNavPreview();
    updateFileStructure(document.getElementById('packageName').value);
}

function updateBottomNavPreview() {
    const t1 = document.getElementById('navTab1Title').value || 'Home';
    const t2 = document.getElementById('navTab2Title').value || 'Explore';
    const t3 = document.getElementById('navTab3Title').value || 'Orders';
    const t4 = document.getElementById('navTab4Title').value || 'Profile';
    document.getElementById('mockNav1').textContent = t1;
    document.getElementById('mockNav2').textContent = t2;
    document.getElementById('mockNav3').textContent = t3;
    document.getElementById('mockNav4').textContent = t4;
}

function toggleAdMobInputs() {
    const isChecked = document.getElementById('enableAdMob').checked;
    document.getElementById('adMobInputs').style.display = isChecked ? 'grid' : 'none';
    document.getElementById('phoneAdBanner').style.display = isChecked ? 'flex' : 'none';
    updateFileStructure(document.getElementById('packageName').value);
}

function toggleOneSignalInputs() {
    const isChecked = document.getElementById('enableOneSignal').checked;
    document.getElementById('oneSignalInputs').style.display = isChecked ? 'block' : 'none';
    updateFileStructure(document.getElementById('packageName').value);
}

function togglePreviewProgressBar() {
    const isChecked = document.getElementById('enableProgressBar').checked;
    const pBar = document.getElementById('phoneProgressBar');
    if (!isChecked && pBar) {
        pBar.classList.remove('active');
    }
}

function toggleTopActionBar() {
    const isChecked = document.getElementById('enableTopBar') ? document.getElementById('enableTopBar').checked : true;
    const actionBar = document.getElementById('phoneActionBar');
    if (actionBar) {
        actionBar.style.display = isChecked ? 'flex' : 'none';
    }
}

function triggerPreviewLoading() {
    const pBar = document.getElementById('phoneProgressBar');
    const isEnabled = document.getElementById('enableProgressBar') ? document.getElementById('enableProgressBar').checked : true;
    if (!pBar || !isEnabled) {
        if (pBar) pBar.classList.remove('active');
        return;
    }
    const fill = pBar.querySelector('.phone-progress-bar-fill');
    if (!fill) return;
    pBar.classList.add('active');
    fill.style.width = '25%';
    setTimeout(() => { if (fill) fill.style.width = '70%'; }, 180);
    setTimeout(() => { if (fill) fill.style.width = '100%'; }, 450);
    setTimeout(() => {
        if (pBar) pBar.classList.remove('active');
        if (fill) fill.style.width = '0%';
    }, 850);
}

function togglePreviewFullscreen() {
    const isFullscreen = document.getElementById('enableFullscreen').checked;
    document.getElementById('phoneStatusBar').style.display = isFullscreen ? 'none' : 'flex';
    document.getElementById('phoneActionBar').style.display = isFullscreen ? 'none' : (document.getElementById('enableTopBar')?.checked ? 'flex' : 'none');
}

function handleOrientationChange(val) {
    setPreviewOrientation(val === 'landscape' ? 'landscape' : 'portrait');
}

function setPreviewOrientation(orientation) {
    const mockup = document.getElementById('phoneMockup');
    const pBtn = document.getElementById('portraitPreviewBtn');
    const lBtn = document.getElementById('landscapePreviewBtn');
    if (!mockup) return;
    if (orientation === 'landscape') {
        mockup.classList.add('landscape');
        if (pBtn) pBtn.classList.remove('active');
        if (lBtn) lBtn.classList.add('active');
    } else {
        mockup.classList.remove('landscape');
        if (lBtn) lBtn.classList.remove('active');
        if (pBtn) pBtn.classList.add('active');
    }
    const orientSelect = document.getElementById('screenOrientation');
    if (orientSelect) orientSelect.value = orientation;
}

let backPressTimer = null;
function simulateBackPress() {
    const toast = document.getElementById('phoneToast');
    if (backPressTimer) {
        clearTimeout(backPressTimer);
        backPressTimer = null;
        if (toast) {
            toast.textContent = "Exiting app 👋";
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 1500);
        }
        showNotification("Exiting app 👋", 1500);
    } else {
        if (toast) {
            toast.textContent = "Press back again to exit";
            toast.classList.add('show');
            backPressTimer = setTimeout(() => {
                toast.classList.remove('show');
                backPressTimer = null;
            }, 2000);
        }
        showNotification("Press back again to exit", 1500);
    }
}

function testSimulatedBridge(action) {
    const toast = document.getElementById('phoneToast');
    let msg = '';
    if (action === 'toast') {
        msg = "Native Android Toast: Hello! 👋";
    } else if (action === 'vibrate') {
        if (navigator.vibrate) navigator.vibrate(100);
        msg = "📳 Haptic Vibrate (100ms)";
    } else if (action === 'share') {
        msg = "📤 Android Native Share Sheet Opened";
    } else if (action === 'battery') {
        msg = "🔋 Battery Level: 100% (Charging)";
    } else if (action === 'network') {
        msg = "🌐 Network: 5G High Speed (ONLINE)";
    }
    if (toast && msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
    if (msg) {
        showNotification(msg, 2000);
    }
}

function updatePreviews(isColorChange = false) {
    const appName = document.getElementById('appName') ? document.getElementById('appName').value || 'MyMobileApp' : 'MyMobileApp';
    const primaryColor = document.getElementById('primaryColor') ? document.getElementById('primaryColor').value : '#10b981';
    
    const actionBar = document.getElementById('phoneActionBar');
    if (actionBar) {
        actionBar.textContent = appName;
        actionBar.style.background = primaryColor;
    }
    
    if (isColorChange && document.getElementById('primaryColorText')) {
        document.getElementById('primaryColorText').value = primaryColor;
    }
    
    renderSplashPreview();
    updatePreview();
    updateQrCode();
}

function updatePreview() {
    triggerPreviewLoading();
    toggleTopActionBar();

    const previewFrame = document.getElementById('phonePreview');
    if (!previewFrame) return;

    if (currentSourceMode === 'url') {
        let url = (document.getElementById('webUrl') ? document.getElementById('webUrl').value.trim() : '') || 'https://example.com';
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        previewFrame.innerHTML = `
            <iframe src="${url}" style="width: 100%; height: 100%; border: none; background: white; display: block;" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>`;
        return;
    }

    const htmlContent = document.getElementById('htmlEditor') ? document.getElementById('htmlEditor').value : '';
    if (!htmlContent.trim()) {
        previewFrame.innerHTML = '<div style="text-align: center; padding: 2rem; color: #94a3b8;"><p>Enter HTML content and click "Refresh Preview"</p></div>';
        return;
    }

    try {
        // Inject AndroidBridge Polyfill inside the preview iframe
        const bridgePolyfill = `
<script>
window.AndroidBridge = {
    showToast: function(msg) {
        try {
            var t = parent.document.getElementById('phoneToast');
            if(t){ t.textContent = msg; t.classList.add('show'); setTimeout(function(){ t.classList.remove('show'); }, 2000); return; }
        } catch(e){}
        window.parent.postMessage({ type: 'web2app-toast', message: msg }, '*');
    },
    vibrate: function(ms) {
        if (navigator.vibrate) navigator.vibrate(ms || 50);
        try {
            var t = parent.document.getElementById('phoneToast');
            if(t){ t.textContent = '📳 Vibration: ' + (ms || 50) + 'ms'; t.classList.add('show'); setTimeout(function(){ t.classList.remove('show'); }, 1200); return; }
        } catch(e){}
        window.parent.postMessage({ type: 'web2app-toast', message: '📳 Vibration: ' + (ms || 50) + 'ms' }, '*');
    },
    shareText: function(text, title) {
        if(navigator.share) { navigator.share({ title: title, text: text }); }
        else { alert('Share: ' + text); }
    },
    copyToClipboard: function(text) {
        if (navigator.clipboard) navigator.clipboard.writeText(text);
        try {
            var t = parent.document.getElementById('phoneToast');
            if(t){ t.textContent = '📋 Copied to clipboard!'; t.classList.add('show'); setTimeout(function(){ t.classList.remove('show'); }, 1500); return; }
        } catch(e){}
        window.parent.postMessage({ type: 'web2app-toast', message: '📋 Copied to clipboard!' }, '*');
    },
    openExternal: function(url) { window.open(url, '_blank'); },
    getAppVersion: function() { return '1.0.0'; },
    getDeviceModel: function() { return 'Android Phone'; },
    getNetworkStatus: function() { return navigator.onLine ? 'ONLINE' : 'OFFLINE'; },
    getBatteryLevel: function() { return 100; },
    setStatusBarColor: function(col) {
        try {
            var sb = parent.document.getElementById('phoneStatusBar');
            if (sb) sb.style.background = col;
        } catch(e){}
    },
    exitApp: function() {
        try {
            var t = parent.document.getElementById('phoneToast');
            if (t) { t.textContent = "Exiting app 👋"; t.classList.add('show'); setTimeout(function(){ t.classList.remove('show'); }, 1500); return; }
        } catch(e){}
        window.parent.postMessage({ type: 'web2app-toast', message: 'Exiting app 👋' }, '*');
    }
};
<\/script>
`;

        let contentToWrite = htmlContent;

        // If files from uploaded ZIP are present, rewrite relative links, scripts & images to Blob URLs
        if (uploadedZipFiles && Object.keys(uploadedZipBlobUrls).length > 0) {
            for (const [relPath, blobUrl] of Object.entries(uploadedZipBlobUrls)) {
                if (relPath.toLowerCase() === 'index.html') continue;
                const esc = relPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                
                // Matches (src|href|poster)="css/style.css", "./css/style.css" or "/css/style.css"
                const attrRegex = new RegExp(`(src|href|poster)=["'](?:\\.\\/|\\/)?(?:[^"']*\\/)?${esc}(?:[?#][^"']*)?["']`, 'gi');
                contentToWrite = contentToWrite.replace(attrRegex, (m, attr) => `${attr}="${blobUrl}"`);
                
                // Also match inline CSS url(...) in style attributes or <style> tags
                const cssRegex = new RegExp(`url\\(\\s*["']?(?:\\.\\/|\\/)?(?:[^)]*\\/)?${esc}(?:[?#][^"']*)?["']?\\s*\\)`, 'gi');
                contentToWrite = contentToWrite.replace(cssRegex, `url("${blobUrl}")`);
            }
        }

        // Floating Action Support Widget Injection (if enabled)
        if (document.getElementById('enableFloatingWidget') && document.getElementById('enableFloatingWidget').checked) {
            const wType = document.getElementById('floatingWidgetType').value;
            const wNum = (document.getElementById('floatingWidgetNumber').value || '+8801700000000').trim();
            let targetHref = `https://wa.me/${wNum.replace(/[^0-9]/g, '')}`;
            let iconText = '💬 WhatsApp';
            let bgCol = '#25d366';
            if (wType === 'call') {
                targetHref = `tel:${wNum}`;
                iconText = '📞 Call Us';
                bgCol = '#0284c7';
            } else if (wType === 'telegram') {
                targetHref = `https://t.me/${wNum.replace(/^@/, '')}`;
                iconText = '✈️ Telegram';
                bgCol = '#0088cc';
            }
            const fabHtml = `
<a href="${targetHref}" target="_blank" onclick="if(window.AndroidBridge){ AndroidBridge.openExternal('${targetHref}'); return false; }" style="position: fixed; bottom: 20px; right: 20px; background: ${bgCol}; color: white; padding: 10px 16px; border-radius: 25px; text-decoration: none; font-size: 13px; font-weight: bold; box-shadow: 0 4px 14px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 6px; z-index: 9999; font-family: sans-serif;">
    ${iconText}
</a>`;
            if (contentToWrite.includes('</body>')) {
                contentToWrite = contentToWrite.replace('</body>', fabHtml + '\n</body>');
            } else {
                contentToWrite += fabHtml;
            }
        }

        if (contentToWrite.includes('<head>')) {
            contentToWrite = contentToWrite.replace('<head>', '<head>' + bridgePolyfill);
        } else {
            contentToWrite = bridgePolyfill + contentToWrite;
        }

        const tempIframe = document.createElement('iframe');
        tempIframe.id = 'previewIframe';
        tempIframe.style.cssText = 'width: 100%; height: 100%; border: none; background: white; display: block;';
        tempIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-modals allow-forms');
        tempIframe.srcdoc = contentToWrite;
        previewFrame.innerHTML = '';
        previewFrame.appendChild(tempIframe);

    } catch (error) {
        console.error('Preview render error:', error);
        previewFrame.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--danger);"><h3>Preview Error</h3><p>Unable to render HTML (Check for malformed code).</p></div>';
    }
}

function updateQrCode() {
    let url = 'https://example.com';
    if (currentSourceMode === 'url') {
        url = document.getElementById('webUrl').value.trim() || 'https://example.com';
    } else {
        url = window.location.href;
    }
    const qrImg = document.getElementById('qrCodeImg');
    if (qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(url)}`;
    }
}

function updateFileStructure(packageName) {
    const packagePath = (packageName || 'com.example.mymobileapp').replace(/\./g, '/');
    const enableSplash = document.getElementById('enableSplash').checked;
    const enableBottomNav = document.getElementById('enableBottomNav').checked;
    
    document.getElementById('fileStructure').innerHTML = `<div class="folder">MyAndroidProject/
<div class="folder-content">
    <div class="file-item">gradlew & gradlew.bat (Gradle Wrapper)</div>
    <div class="file-item">build.gradle (Root Project)</div>
    <div class="file-item">settings.gradle</div>
    <div class="folder">.github/workflows/
        <div class="folder-content">
            <div class="file-item">build-apk.yml (Free Cloud APK CI/CD)</div>
        </div>
    </div>
    <div class="folder">app/
        <div class="folder-content">
            <div class="file-item">build.gradle (App Module)</div>
            <div class="file-item">proguard-rules.pro</div>
            <div class="folder">src/main/
                <div class="folder-content">
                    <div class="file-item">AndroidManifest.xml</div>
                    <div class="folder">java/${packagePath}/
                        <div class="folder-content">
                            <div class="file-item">MainActivity.java (With AndroidBridge)</div>
                            ${enableSplash ? '<div class="file-item">SplashActivity.java</div>' : ''}
                        </div>
                    </div>
                    <div class="folder">res/
                        <div class="folder-content">
                            <div class="folder">values/ (strings.xml, colors.xml)</div>
                            <div class="folder">layout/ (activity_main.xml${enableSplash ? ', activity_splash.xml' : ''})</div>
                            ${enableBottomNav ? '<div class="folder">menu/ (bottom_nav_menu.xml)</div>' : ''}
                            <div class="folder">mipmap-xxxhdpi/ (ic_launcher.png)</div>
                        </div>
                    </div>
                    <div class="folder">assets/
                        <div class="folder-content">
                            <div class="file-item">index.html (Your Web Code)</div>
                            <div class="file-item">offline.html (Offline Screen)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div></div>`;
}

function validateAppName(input) {
    const isValid = input.value.trim().length > 0;
    input.closest('.form-group').classList.toggle('error', !isValid);
    return isValid;
}

function validatePackageName(input) {
    const regex = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/;
    const isValid = regex.test(input.value);
    input.closest('.form-group').classList.toggle('error', !isValid);
    return isValid;
}

function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

function clearEditor() {
    document.getElementById('htmlEditor').value = '';
    document.getElementById('phonePreview').innerHTML = '<div style="text-align: center; padding: 2rem; color: #94a3b8;"><p>📝 Enter HTML content or load a template and click "Refresh"</p></div>';
    showNotification('🗑️ Editor cleared!', 2000);
}

function loadSample() {
    loadTemplate('ecommerce');
}

function formatEditorCode() {
    const editor = document.getElementById('htmlEditor');
    let code = editor.value;
    if (!code) return;
    editor.value = code.trim();
    showNotification("✨ Code formatted!", 1500);
}

function resetForm(suppressNotification = false) {
    document.getElementById('appName').value = 'MyMobileApp';
    document.getElementById('packageName').value = 'com.example.mymobileapp';
    document.getElementById('versionName').value = '1.0.0';
    document.getElementById('versionCode').value = 1;
    document.getElementById('primaryColor').value = '#10b981';
    document.getElementById('primaryColorText').value = '#10b981';
    document.getElementById('accentColor').value = '#f59e0b';
    document.getElementById('accentColorText').value = '#f59e0b';
    document.getElementById('appIcon').value = '⚡';
    document.getElementById('splashText').value = 'MyMobileApp';
    document.getElementById('enableSplash').checked = false;
    document.getElementById('enableBottomNav').checked = false;
    if (document.getElementById('enableTopBar')) document.getElementById('enableTopBar').checked = true;
    document.getElementById('enableSmartBack').checked = true;
    document.getElementById('enablePullToRefresh').checked = true;
    document.getElementById('enableProgressBar').checked = true;
    document.getElementById('enableOfflineScreen').checked = true;
    document.getElementById('enableFileChooser').checked = true;
    document.getElementById('enableDownloadManager').checked = true;
    document.getElementById('enableExternalLinks').checked = true;
    document.getElementById('enableInAppRating').checked = true;
    document.getElementById('enableBridge').checked = true;
    document.getElementById('screenOrientation').value = 'portrait';
    document.getElementById('enableFullscreen').checked = false;
    document.getElementById('enableKeepScreenOn').checked = false;
    document.getElementById('enableDarkMode').checked = false;
    document.getElementById('enableBiometric').checked = false;
    document.getElementById('enableSecureMode').checked = false;
    document.getElementById('enableAdMob').checked = false;
    document.getElementById('enableOneSignal').checked = false;

    iconShape = 'squircle';
    iconGradStart = '#10b981';
    iconGradEnd = '#059669';
    iconGlyph = '⚡';
    customIconBase64 = null;
    customSplashBase64 = null;

    toggleAdMobInputs();
    toggleOneSignalInputs();
    toggleBottomNavBuilder();
    toggleSplash();
    updateIconCanvas();
    updatePreviews(true);
    updateFileStructure('com.example.mymobileapp');

    if (!suppressNotification) {
        showNotification('↩️ All configurations reset to default.', 2500);
    }
}

// Single-File Web App Downloader (.html)
function exportSingleHtml() {
    const htmlContent = document.getElementById('htmlEditor').value;
    if (!htmlContent) {
        showNotification("❌ Editor is empty. Load a template first!", 3000);
        return;
    }
    const appName = document.getElementById('appName').value || 'MyWebApp';
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${appName.replace(/\s+/g, '_')}_SingleFile.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification(`📦 Downloaded standalone single-file: ${appName}.html!`, 3500);
}

// Progressive Web App (PWA) Exporter (.zip)
async function exportPwaZip() {
    const appName = document.getElementById('appName').value || 'MyPwaApp';
    const primaryColor = document.getElementById('primaryColor').value;
    const htmlContent = document.getElementById('htmlEditor').value;

    const zip = new JSZip();

    // PWA Manifest
    const manifest = {
        name: appName,
        short_name: appName,
        start_url: "./index.html",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: primaryColor,
        icons: [
            {
                src: "icon-192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "icon-512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    };

    // Service Worker with offline caching
    const swCode = `// PWA Service Worker for ${appName}
const CACHE_NAME = '${appName.toLowerCase()}-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.webmanifest'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); })
        ))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => caches.match('./index.html'));
        })
    );
});`;

    // Inject SW registration into HTML
    let injectedHtml = htmlContent;
    const swRegTag = `
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="${primaryColor}">
<script>
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(console.error);
    });
}
<\/script>
`;
    if (injectedHtml.includes('</head>')) {
        injectedHtml = injectedHtml.replace('</head>', swRegTag + '</head>');
    } else {
        injectedHtml = swRegTag + injectedHtml;
    }

    zip.file('index.html', injectedHtml);
    zip.file('manifest.webmanifest', JSON.stringify(manifest, null, 2));
    zip.file('sw.js', swCode);

    // If multi-file project or unzipped folders are uploaded, package all assets into PWA zip too
    if (uploadedZipFiles) {
        for (const [relativePath, fileBuffer] of Object.entries(uploadedZipFiles)) {
            if (relativePath.toLowerCase() === 'index.html') continue;
            zip.file(relativePath, fileBuffer);
        }
    }

    // Generate PNG icons
    const icon192 = await generateMipmapPng(192);
    const icon512 = await generateMipmapPng(512);
    zip.file('icon-192.png', icon192);
    zip.file('icon-512.png', icon512);

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${appName.replace(/\s+/g, '_')}_PWA_Package.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification(`📲 PWA Package for ${appName} generated!`, 4000);
}

// Android Project Code Generators
function generateMainActivity(config) {
    const packagePath = config.packageName;
    const isUrl = config.sourceMode === 'url';
    const targetUrl = isUrl ? config.webUrl : 'file:///android_asset/index.html';

    return `package ${packagePath};

import android.annotation.SuppressLint;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
${config.features.pullToRefresh ? 'import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;' : ''}
${config.bottomNav.enabled ? 'import com.google.android.material.bottomnavigation.BottomNavigationView;' : ''}
${config.adMob.enabled ? 'import com.google.android.gms.ads.AdRequest;\nimport com.google.android.gms.ads.AdView;\nimport com.google.android.gms.ads.MobileAds;' : ''}
${config.features.biometric ? 'import androidx.biometric.BiometricPrompt;\nimport androidx.core.content.ContextCompat;\nimport java.util.concurrent.Executor;' : ''}

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private ProgressBar progressBar;
    ${config.features.pullToRefresh ? 'private SwipeRefreshLayout swipeRefreshLayout;' : ''}
    ${config.bottomNav.enabled ? 'private BottomNavigationView bottomNavigationView;' : ''}
    ${config.adMob.enabled ? 'private AdView adView;' : ''}
    private boolean doubleBackToExitPressedOnce = false;
    private ValueCallback<Uri[]> filePathCallback;
    private static final int FILE_CHOOSER_REQUEST_CODE = 1001;

    // Web-to-Native JavaScript Bridge Interface
    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void showToast(String toast) {
            runOnUiThread(() -> Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show());
        }

        @JavascriptInterface
        public void vibrate(long milliseconds) {
            Vibrator v = (Vibrator) mContext.getSystemService(Context.VIBRATOR_SERVICE);
            if (v != null) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    v.vibrate(VibrationEffect.createOneShot(milliseconds > 0 ? milliseconds : 50, VibrationEffect.DEFAULT_AMPLITUDE));
                } else {
                    v.vibrate(milliseconds > 0 ? milliseconds : 50);
                }
            }
        }

        @JavascriptInterface
        public void shareText(String text, String title) {
            Intent sendIntent = new Intent();
            sendIntent.setAction(Intent.ACTION_SEND);
            sendIntent.putExtra(Intent.EXTRA_TEXT, text);
            sendIntent.setType("text/plain");
            Intent shareIntent = Intent.createChooser(sendIntent, title != null ? title : "Share");
            mContext.startActivity(shareIntent);
        }

        @JavascriptInterface
        public void copyToClipboard(String text) {
            ClipboardManager clipboard = (ClipboardManager) mContext.getSystemService(Context.CLIPBOARD_SERVICE);
            ClipData clip = ClipData.newPlainText("Copied Text", text);
            if (clipboard != null) {
                clipboard.setPrimaryClip(clip);
                runOnUiThread(() -> Toast.makeText(mContext, "Copied to clipboard", Toast.LENGTH_SHORT).show());
            }
        }

        @JavascriptInterface
        public void openExternal(String url) {
            try {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                mContext.startActivity(browserIntent);
            } catch (Exception e) {
                runOnUiThread(() -> Toast.makeText(mContext, "Unable to open link", Toast.LENGTH_SHORT).show());
            }
        }

        @JavascriptInterface
        public String getAppVersion() {
            return "${config.versionName}";
        }

        @JavascriptInterface
        public String getDeviceModel() {
            return Build.MANUFACTURER + " " + Build.MODEL;
        }

        @JavascriptInterface
        public String getNetworkStatus() {
            return isNetworkAvailable() ? "ONLINE" : "OFFLINE";
        }

        @JavascriptInterface
        public int getBatteryLevel() {
            try {
                android.os.BatteryManager bm = (android.os.BatteryManager) mContext.getSystemService(Context.BATTERY_SERVICE);
                if (bm != null) {
                    return bm.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY);
                }
            } catch (Exception ignored) {}
            return 100;
        }

        @JavascriptInterface
        public void setStatusBarColor(String hexColor) {
            runOnUiThread(() -> {
                try {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        getWindow().setStatusBarColor(android.graphics.Color.parseColor(hexColor));
                    }
                } catch (Exception ignored) {}
            });
        }

        @JavascriptInterface
        public void exitApp() {
            runOnUiThread(() -> finish());
        }
    }

    @SuppressLint({"SetJavaScriptEnabled", "JavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ${config.features.secureMode ? 'getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);' : ''}
        ${config.features.keepScreenOn ? 'getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);' : ''}

        ${config.orientation === 'portrait' ? 'setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);' : ''}
        ${config.orientation === 'landscape' ? 'setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);' : ''}

        ${config.features.fullscreen ? 'getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);' : ''}

        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        progressBar = findViewById(R.id.progressBar);
        ${config.features.pullToRefresh ? 'swipeRefreshLayout = findViewById(R.id.swipeRefresh);' : ''}
        ${config.bottomNav.enabled ? 'bottomNavigationView = findViewById(R.id.bottomNav);' : ''}
        ${config.adMob.enabled ? 'adView = findViewById(R.id.adView);' : ''}

        ${config.adMob.enabled ? `
        // Initialize AdMob
        MobileAds.initialize(this, initializationStatus -> {});
        AdRequest adRequest = new AdRequest.Builder().build();
        if (adView != null) adView.loadAd(adRequest);
        ` : ''}

        setupWebView();

        ${config.features.pullToRefresh ? `
        swipeRefreshLayout.setOnRefreshListener(() -> {
            if (isNetworkAvailable()) {
                webView.reload();
            } else {
                swipeRefreshLayout.setRefreshing(false);
                Toast.makeText(this, "No internet connection", Toast.LENGTH_SHORT).show();
            }
        });
        ` : ''}

        ${config.bottomNav.enabled ? `
        bottomNavigationView.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.nav_tab_1) {
                webView.loadUrl("${config.bottomNav.tab1Url}");
                return true;
            } else if (itemId == R.id.nav_tab_2) {
                webView.loadUrl("${config.bottomNav.tab2Url}");
                return true;
            } else if (itemId == R.id.nav_tab_3) {
                webView.loadUrl("${config.bottomNav.tab3Url}");
                return true;
            } else if (itemId == R.id.nav_tab_4) {
                webView.loadUrl("${config.bottomNav.tab4Url}");
                return true;
            }
            return false;
        });
        ` : ''}

        if (isNetworkAvailable() || !${isUrl}) {
            webView.loadUrl("${targetUrl}");
        } else {
            webView.loadUrl("file:///android_asset/offline.html");
        }
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager == null) return false;
        NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(connectivityManager.getActiveNetwork());
        return capabilities != null && (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) || capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR));
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void setupWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        if (!"${config.customUserAgent}".isEmpty()) {
            settings.setUserAgentString(settings.getUserAgentString() + " ${config.customUserAgent}");
        }

        ${config.features.bridge ? 'webView.addJavascriptInterface(new WebAppInterface(this), "AndroidBridge");' : ''}

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                if (progressBar != null) progressBar.setVisibility(View.VISIBLE);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                if (progressBar != null) progressBar.setVisibility(View.GONE);
                ${config.features.pullToRefresh ? 'if (swipeRefreshLayout != null) swipeRefreshLayout.setRefreshing(false);' : ''}
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                ${config.features.offlineScreen ? `
                if (request.isForMainFrame()) {
                    webView.loadUrl("file:///android_asset/offline.html");
                }
                ` : ''}
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (url.startsWith("tel:") || url.startsWith("mailto:") || url.startsWith("sms:") || url.startsWith("whatsapp:") || url.startsWith("https://wa.me/")) {
                    try {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        startActivity(intent);
                        return true;
                    } catch (Exception e) {
                        Toast.makeText(MainActivity.this, "App not found for this action", Toast.LENGTH_SHORT).show();
                        return true;
                    }
                }
                return false;
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if (progressBar != null) {
                    progressBar.setProgress(newProgress);
                    if (newProgress == 100) progressBar.setVisibility(View.GONE);
                }
            }

            ${config.features.fileChooser ? `
            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                if (MainActivity.this.filePathCallback != null) {
                    MainActivity.this.filePathCallback.onReceiveValue(null);
                }
                MainActivity.this.filePathCallback = filePathCallback;
                Intent intent = fileChooserParams.createIntent();
                try {
                    startActivityForResult(intent, FILE_CHOOSER_REQUEST_CODE);
                } catch (Exception e) {
                    MainActivity.this.filePathCallback = null;
                    Toast.makeText(MainActivity.this, "Cannot open file chooser", Toast.LENGTH_SHORT).show();
                    return false;
                }
                return true;
            }
            ` : ''}
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQUEST_CODE) {
            if (filePathCallback == null) return;
            Uri[] results = null;
            if (resultCode == RESULT_OK && data != null) {
                String dataString = data.getDataString();
                if (dataString != null) {
                    results = new Uri[]{Uri.parse(dataString)};
                } else if (data.getClipData() != null) {
                    int count = data.getClipData().getItemCount();
                    results = new Uri[count];
                    for (int i = 0; i < count; i++) {
                        results[i] = data.getClipData().getItemAt(i).getUri();
                    }
                }
            }
            filePathCallback.onReceiveValue(results);
            filePathCallback = null;
        }
    }

    ${config.features.smartBack ? `
    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            if (doubleBackToExitPressedOnce) {
                super.onBackPressed();
                return;
            }
            this.doubleBackToExitPressedOnce = true;
            Toast.makeText(this, "Press back again to exit", Toast.LENGTH_SHORT).show();
            new Handler(Looper.getMainLooper()).postDelayed(() -> doubleBackToExitPressedOnce = false, 2000);
        }
    }
    ` : ''}
}
`;
}

function generateManifest(config) {
    return `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${config.packageName}">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    ${config.features.fileChooser ? '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>\n    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>' : ''}
    ${config.features.biometric ? '<uses-permission android:name="android.permission.USE_BIOMETRIC"/>' : ''}

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher"
        android:supportsRtl="true"
        android:usesCleartextTraffic="true"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">

        ${config.adMob.enabled ? `
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="${config.adMob.appId}"/>
        ` : ''}

        ${config.enableSplash ? `
        <activity
            android:name=".SplashActivity"
            android:exported="true"
            android:theme="@style/Theme.AppCompat.Light.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity
            android:name=".MainActivity"
            android:exported="false"
            android:configChanges="orientation|screenSize|keyboardHidden" />
        ` : `
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        `}

        ${config.deepLink && config.deepLink.enabled ? `
        <!-- Deep Link & Custom URL Scheme Support -->
        <activity
            android:name=".DeepLinkActivity"
            android:exported="true">
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https" android:host="${config.deepLink.host}" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="${config.deepLink.scheme}" />
            </intent-filter>
        </activity>
        ` : ''}
    </application>
</manifest>`;
}

function generateAppBuildGradle(config) {
    return `plugins {
    id 'com.android.application'
}

android {
    namespace '${config.packageName}'
    compileSdk 34

    defaultConfig {
        applicationId "${config.packageName}"
        minSdk 21
        targetSdk 34
        versionCode ${config.versionCode}
        versionName "${config.versionName}"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    ${config.features.pullToRefresh ? "implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'" : ''}
    ${config.features.biometric ? "implementation 'androidx.biometric:biometric:1.1.0'" : ''}
    ${config.adMob.enabled ? "implementation 'com.google.android.gms:play-services-ads:23.0.0'" : ''}
    ${config.oneSignal.enabled ? "implementation 'com.onesignal:OneSignal:5.1.13'" : ''}
}
`;
}

function generateRootBuildGradle() {
    return `buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.2'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
`;
}

function generateSettingsGradle(config) {
    return `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "${config.appName.replace(/[^a-zA-Z0-9_-]/g, '')}"
include ':app'
`;
}

function generateLayoutXml(config) {
    const hasSwipe = config.features.pullToRefresh;
    const hasAdMob = config.adMob.enabled;
    const hasBottomNav = config.bottomNav.enabled;
    const hasProgressBar = config.features.progressBar;

    return `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    ${hasAdMob || hasBottomNav ? 'xmlns:app="http://schemas.android.com/apk/res-auto"' : ''}
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#ffffff">

    ${hasProgressBar ? `
    <ProgressBar
        android:id="@+id/progressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="match_parent"
        android:layout_height="4dp"
        android:layout_alignParentTop="true"
        android:visibility="gone"
        android:progressDrawable="@android:drawable/progress_horizontal"
        android:max="100" />
    ` : ''}

    ${hasSwipe ? `
    <androidx.swiperefreshlayout.widget.SwipeRefreshLayout
        android:id="@+id/swipeRefresh"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        ${hasProgressBar ? 'android:layout_below="@id/progressBar"' : 'android:layout_alignParentTop="true"'}
        ${hasBottomNav ? 'android:layout_above="@id/bottomNav"' : (hasAdMob ? 'android:layout_above="@id/adView"' : '')}>

        <WebView
            android:id="@+id/webView"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
    </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>
    ` : `
    <WebView
        android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        ${hasProgressBar ? 'android:layout_below="@id/progressBar"' : 'android:layout_alignParentTop="true"'}
        ${hasBottomNav ? 'android:layout_above="@id/bottomNav"' : (hasAdMob ? 'android:layout_above="@id/adView"' : '')} />
    `}

    ${hasBottomNav ? `
    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomNav"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        ${hasAdMob ? 'android:layout_above="@id/adView"' : 'android:layout_alignParentBottom="true"'}
        android:background="#ffffff"
        app:menu="@menu/bottom_nav_menu" />
    ` : ''}

    ${hasAdMob ? `
    <com.google.android.gms.ads.AdView
        android:id="@+id/adView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        app:adSize="BANNER"
        app:adUnitId="${config.adMob.bannerId}" />
    ` : ''}

</RelativeLayout>`;
}

function generateBottomNavMenu(config) {
    return `<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/nav_tab_1"
        android:icon="@android:drawable/ic_menu_today"
        android:title="${config.bottomNav.tab1Title}" />
    <item
        android:id="@+id/nav_tab_2"
        android:icon="@android:drawable/ic_menu_compass"
        android:title="${config.bottomNav.tab2Title}" />
    <item
        android:id="@+id/nav_tab_3"
        android:icon="@android:drawable/ic_menu_agenda"
        android:title="${config.bottomNav.tab3Title}" />
    <item
        android:id="@+id/nav_tab_4"
        android:icon="@android:drawable/ic_menu_myplaces"
        android:title="${config.bottomNav.tab4Title}" />
</menu>`;
}

function generateOfflineHtml(retryUrl) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>No Connection</title>
    <style>
        body { font-family: -apple-system, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f8fafc; color: #1e293b; text-align: center; padding: 20px; }
        .icon { font-size: 64px; margin-bottom: 16px; }
        h1 { font-size: 22px; margin-bottom: 8px; color: #0f172a; }
        p { font-size: 14px; color: #64748b; margin-bottom: 24px; line-height: 1.5; }
        .btn { background: #10b981; color: white; border: none; padding: 12px 28px; border-radius: 25px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 12px rgba(16,185,129,0.3); }
    </style>
</head>
<body>
    <div class="icon">📡</div>
    <h1>No Internet Connection</h1>
    <p>Please check your cellular data or Wi-Fi network and tap retry.</p>
    <button class="btn" onclick="location.href='${retryUrl}'">🔄 Tap to Retry</button>
</body>
</html>`;
}

// GitHub Actions Cloud Workflow
function generateGitHubActionsWorkflow(appName) {
    return `name: Build Android APK
on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  build:
    name: Compile Android Debug APK
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Grant Execute Permission for Gradle Wrapper
        run: chmod +x gradlew

      - name: Build Android Debug APK
        run: ./gradlew assembleDebug --stacktrace

      - name: Upload Compiled APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: ${appName.replace(/\s+/g, '-')}-debug.apk
          path: app/build/outputs/apk/debug/app-debug.apk
`;
}

// Main ZIP Generation Engine
async function generateProject() {
    const appNameInput = document.getElementById('appName');
    const packageNameInput = document.getElementById('packageName');

    if (!validateAppName(appNameInput) || !validatePackageName(packageNameInput)) {
        showNotification('❌ Please fix errors in App Name or Package Name before generating.', 4000);
        return;
    }

    const btn = document.getElementById('generateBtn');
    const loading = document.getElementById('loadingIndicator');
    btn.disabled = true;
    loading.classList.add('active');

    try {
        const appName = appNameInput.value.trim();
        const packageName = packageNameInput.value.trim();
        const versionName = document.getElementById('versionName').value.trim() || '1.0.0';
        const versionCode = parseInt(document.getElementById('versionCode').value.trim()) || 1;
        const primaryColor = document.getElementById('primaryColor').value;
        const accentColor = document.getElementById('accentColor').value;
        const webUrl = document.getElementById('webUrl').value.trim() || 'https://example.com';
        const htmlContent = document.getElementById('htmlEditor').value;

        const config = {
            appName,
            packageName,
            packagePath: packageName.replace(/\./g, '/'),
            versionName,
            versionCode,
            primaryColor,
            accentColor,
            sourceMode: currentSourceMode,
            webUrl,
            htmlContent,
            orientation: document.getElementById('screenOrientation').value,
            customUserAgent: document.getElementById('customUserAgent').value.trim(),
            enableSplash: document.getElementById('enableSplash').checked,
            splashText: document.getElementById('splashText').value.trim() || appName,
            features: {
                smartBack: document.getElementById('enableSmartBack').checked,
                pullToRefresh: document.getElementById('enablePullToRefresh').checked,
                progressBar: document.getElementById('enableProgressBar').checked,
                offlineScreen: document.getElementById('enableOfflineScreen').checked,
                fileChooser: document.getElementById('enableFileChooser').checked,
                downloadManager: document.getElementById('enableDownloadManager').checked,
                externalLinks: document.getElementById('enableExternalLinks').checked,
                biometric: document.getElementById('enableBiometric').checked,
                secureMode: document.getElementById('enableSecureMode').checked,
                fullscreen: document.getElementById('enableFullscreen').checked,
                keepScreenOn: document.getElementById('enableKeepScreenOn').checked,
                darkMode: document.getElementById('enableDarkMode').checked,
                bridge: document.getElementById('enableBridge').checked
            },
            bottomNav: {
                enabled: document.getElementById('enableBottomNav').checked,
                tab1Title: document.getElementById('navTab1Title').value || 'Home',
                tab1Url: document.getElementById('navTab1Url').value || '/',
                tab2Title: document.getElementById('navTab2Title').value || 'Explore',
                tab2Url: document.getElementById('navTab2Url').value || '/explore',
                tab3Title: document.getElementById('navTab3Title').value || 'Orders',
                tab3Url: document.getElementById('navTab3Url').value || '/orders',
                tab4Title: document.getElementById('navTab4Title').value || 'Profile',
                tab4Url: document.getElementById('navTab4Url').value || '/profile'
            },
            adMob: {
                enabled: document.getElementById('enableAdMob').checked,
                appId: document.getElementById('adMobAppId').value.trim(),
                bannerId: document.getElementById('adMobBannerId').value.trim()
            },
            oneSignal: {
                enabled: document.getElementById('enableOneSignal').checked,
                appId: document.getElementById('oneSignalAppId').value.trim()
            },
            deepLink: {
                enabled: document.getElementById('enableDeepLinking').checked,
                scheme: (document.getElementById('urlScheme').value.trim() || 'myapp').replace(/[^a-zA-Z0-9_-]/g, ''),
                host: document.getElementById('deepLinkHost').value.trim() || 'app.example.com'
            },
            floatingWidget: {
                enabled: document.getElementById('enableFloatingWidget').checked,
                type: document.getElementById('floatingWidgetType').value,
                number: document.getElementById('floatingWidgetNumber').value.trim() || '+8801700000000'
            }
        };

        const zip = new JSZip();
        const rootName = `${appName.replace(/[^a-zA-Z0-9_-]/g, '')}_AndroidProject`;
        const root = zip.folder(rootName);
        const app = root.folder('app');
        const appMain = app.folder('src/main');

        // Cloud build GitHub Actions workflow
        const ghWorkflow = root.folder('.github/workflows');
        ghWorkflow.file('build-apk.yml', generateGitHubActionsWorkflow(appName));

        // App Gradle & ProGuard
        app.file('build.gradle', generateAppBuildGradle(config));
        app.file('proguard-rules.pro', "# Android ProGuard Rules\n-keepattributes *Annotation*\n-dontwarn javax.annotation.**\n-keepclassmembers class * {\n    @android.webkit.JavascriptInterface <methods>;\n}\n");
        appMain.file('AndroidManifest.xml', generateManifest(config));

        // Java activity & Bridge
        const javaFolder = appMain.folder(`java/${config.packagePath}`);
        javaFolder.file('MainActivity.java', generateMainActivity(config));

        // Deep Link Activity & Digital Asset Links
        if (config.deepLink.enabled) {
            javaFolder.file('DeepLinkActivity.java', `package ${config.packageName};

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class DeepLinkActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = getIntent();
        Uri data = intent != null ? intent.getData() : null;
        Intent mainIntent = new Intent(this, MainActivity.class);
        if (data != null) {
            mainIntent.setData(data);
        }
        startActivity(mainIntent);
        finish();
    }
}
`);
            root.file('assetlinks.json', JSON.stringify([{
                relation: ["delegate_permission/common.handle_all_urls"],
                target: {
                    namespace: "android_app",
                    package_name: config.packageName,
                    sha256_cert_fingerprints: [
                        "14:6D:E9:CD:07:AB:71:60:E9:63:9B:43:40:F9:6A:94:1E:AA:C7:C4:EA:6B:03:D0:65:C2:5E:28:D1:4D:49:AE"
                    ]
                }
            }], null, 2));
        }

        // Splash screen (Optional)
        if (config.enableSplash) {
            javaFolder.file('SplashActivity.java', `package ${config.packageName};

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            Intent intent = new Intent(SplashActivity.this, MainActivity.class);
            startActivity(intent);
            finish();
        }, 2000);
    }
}`);
            appMain.folder('res/layout').file('activity_splash.xml', `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="${config.primaryColor}">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="${config.splashText}"
        android:textColor="#ffffff"
        android:textSize="26sp"
        android:textStyle="bold" />
</RelativeLayout>`);
        }

        // Layout & resources
        appMain.folder('res/values').file('strings.xml', `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <string name="app_name">${config.appName}</string>\n</resources>`);
        appMain.folder('res/values').file('colors.xml', `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="primary">${config.primaryColor}</color>\n    <color name="accent">${config.accentColor}</color>\n</resources>`);
        appMain.folder('res/layout').file('activity_main.xml', generateLayoutXml(config));

        if (config.bottomNav.enabled) {
            appMain.folder('res/menu').file('bottom_nav_menu.xml', generateBottomNavMenu(config));
        }

        // Generate Multi-Density Real PNG Mipmap Icons
        const densities = [
            { folder: 'res/mipmap-mdpi', size: 48 },
            { folder: 'res/mipmap-hdpi', size: 72 },
            { folder: 'res/mipmap-xhdpi', size: 96 },
            { folder: 'res/mipmap-xxhdpi', size: 144 },
            { folder: 'res/mipmap-xxxhdpi', size: 192 }
        ];

        for (const d of densities) {
            const pngBuffer = await generateMipmapPng(d.size);
            appMain.folder(d.folder).file('ic_launcher.png', pngBuffer);
        }

        // Assets
        const assetsFolder = appMain.folder('assets');
        const defaultStartUrl = config.sourceMode === 'url' ? config.webUrl : 'file:///android_asset/index.html';
        assetsFolder.file('offline.html', generateOfflineHtml(defaultStartUrl));

        if (config.sourceMode !== 'url') {
            if (uploadedZipFiles) {
                for (const [relativePath, fileBuffer] of Object.entries(uploadedZipFiles)) {
                    assetsFolder.file(relativePath, fileBuffer);
                }
                // Ensure latest content from HTML editor is written
                assetsFolder.file('index.html', config.htmlContent);
            } else {
                assetsFolder.file('index.html', config.htmlContent);
            }
        }

        // Root Gradle build configs
        root.file('build.gradle', generateRootBuildGradle());
        root.file('settings.gradle', generateSettingsGradle(config));
        root.file('gradle.properties', "org.gradle.jvmargs=-Xmx2048m\nandroid.useAndroidX=true\n");

        // Gradle Wrapper
        const gradleWrapper = root.folder('gradle/wrapper');
        gradleWrapper.file('gradle-wrapper.properties', `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.2-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`);

        // Executable gradlew scripts
        root.file('gradlew', `#!/usr/bin/env sh
exec java -jar "$APP_HOME/gradle/wrapper/gradle-wrapper.jar" "$@"
`);
        root.file('gradlew.bat', `@rem Gradle wrapper script
@if "%DEBUG%" == "" @echo off
set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%
`);

        // Generate and download ZIP
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${rootName}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        updateFileStructure(packageName);
        showNotification(`🎉 Android Project "${appName}" generated successfully!`, 6000);

    } catch (error) {
        console.error('Generation error:', error);
        showNotification('❌ Error generating project: ' + error.message, 6000);
    } finally {
        btn.disabled = false;
        loading.classList.remove('active');
    }
}

// Interactive Viewport Zoom & Density Controller
let currentZoom = parseFloat(localStorage.getItem('web2app_zoom') || '0.90') || 0.90;

function applyZoom(zoom) {
    currentZoom = Math.min(Math.max(zoom, 0.70), 1.25);
    currentZoom = Math.round(currentZoom * 100) / 100;
    try {
        localStorage.setItem('web2app_zoom', currentZoom.toString());
    } catch (e) {}

    // Adjust document root font size so all rem units scale gracefully
    const rootFontSize = Math.round(14 * (currentZoom / 0.90) * 10) / 10;
    document.documentElement.style.fontSize = `${rootFontSize}px`;

    const display = document.getElementById('zoomDisplay');
    if (display) {
        display.textContent = `${Math.round(currentZoom * 100)}%`;
    }
}

function changeZoom(delta) {
    applyZoom(currentZoom + delta);
    showNotification(`🔍 View Zoom: ${Math.round(currentZoom * 100)}%`, 1000);
}

function resetZoom() {
    applyZoom(0.90);
    showNotification('🔍 Zoom reset to balanced 90%', 1200);
}

window.applyZoom = applyZoom;
window.changeZoom = changeZoom;
window.resetZoom = resetZoom;

// Theme Controller (Cyber Dark Mode & Light Mode)
let currentTheme = localStorage.getItem('web2app_theme') || 'cyber-dark';

function applyTheme(theme) {
    currentTheme = theme;
    try {
        localStorage.setItem('web2app_theme', theme);
    } catch (e) {}

    const isDark = theme === 'cyber-dark';
    document.body.classList.toggle('cyber-dark', isDark);

    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
    if (themeLabel) {
        const dict = translations[currentLanguage] || translations.en;
        themeLabel.textContent = isDark ? (dict.themeLight || 'Light') : (dict.themeDark || 'Dark');
    }
}

function toggleTheme() {
    const nextTheme = currentTheme === 'cyber-dark' ? 'light' : 'cyber-dark';
    applyTheme(nextTheme);
    showNotification(nextTheme === 'cyber-dark' ? '🌙 Cyber Dark Mode enabled' : '☀️ Light Mode enabled', 1500);
}

window.applyTheme = applyTheme;
window.toggleTheme = toggleTheme;

// 5-Stage Step Wizard Navigation Controller
let currentWizardStage = 1;
let isAllStepsView = false;

const stageNames = [
    { en: 'Source & Code', bn: 'সোর্স ও কোড' },
    { en: 'Brand & Identity', bn: 'ব্র্যান্ড ও পরিচয়' },
    { en: 'Navigation & UX', bn: 'ন্যাভিগেশন ও ইউএক্স' },
    { en: 'Bridge & Security', bn: 'ব্রিজ ও সিকিউরিটি' },
    { en: 'Build & Export', bn: 'বিল্ড ও এক্সপোর্ট' }
];

function switchWizardStage(stageIndex) {
    if (stageIndex < 1 || stageIndex > 5) return;
    currentWizardStage = stageIndex;
    isAllStepsView = false;

    const stepsColumn = document.getElementById('stepsColumn');
    if (stepsColumn) stepsColumn.classList.remove('show-all');

    const toggleText = document.getElementById('toggleAllStepsText');
    const dict = translations[currentLanguage] || translations.en;
    if (toggleText) {
        toggleText.textContent = dict.viewAllSteps || '👁️ View All Steps';
    }

    // Update active stage tabs and panels
    for (let i = 1; i <= 5; i++) {
        const tab = document.getElementById(`wizardTab${i}`);
        const panel = document.getElementById(`wizardStage${i}`);
        if (tab) tab.classList.toggle('active', i === stageIndex);
        if (panel) panel.classList.toggle('active', i === stageIndex);
    }

    updateWizardControls();

    // If entering stage 2, refresh canvas & splash preview
    if (stageIndex === 2) {
        setTimeout(() => {
            updateIconCanvas();
            renderSplashPreview();
        }, 50);
    }

    const wizardNavStrip = document.getElementById('wizardNavStrip');
    if (wizardNavStrip) {
        wizardNavStrip.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function navigateWizard(direction) {
    const targetStage = currentWizardStage + direction;
    if (targetStage >= 1 && targetStage <= 5) {
        switchWizardStage(targetStage);
    }
}

function toggleAllStepsView() {
    isAllStepsView = !isAllStepsView;
    const stepsColumn = document.getElementById('stepsColumn');
    const toggleText = document.getElementById('toggleAllStepsText');
    const dict = translations[currentLanguage] || translations.en;

    if (stepsColumn) {
        stepsColumn.classList.toggle('show-all', isAllStepsView);
    }

    if (toggleText) {
        toggleText.textContent = isAllStepsView ? (dict.viewWizardSteps || '📑 Wizard Mode') : (dict.viewAllSteps || '👁️ View All Steps');
    }

    showNotification(isAllStepsView ? '👁️ All 10 Steps expanded' : '📑 Step Wizard Mode active', 1500);
}

function updateWizardControls() {
    const prevBtn = document.getElementById('wizardPrevBtn');
    const nextBtn = document.getElementById('wizardNextBtn');
    const counter = document.getElementById('wizardStageCounter');
    const dict = translations[currentLanguage] || translations.en;

    if (prevBtn) prevBtn.disabled = currentWizardStage <= 1;
    if (nextBtn) {
        if (currentWizardStage >= 5) {
            nextBtn.innerHTML = `🚀 <span>${dict.pillStep10 ? dict.step10Title : 'Build App'}</span>`;
            nextBtn.onclick = () => {
                const step10 = document.getElementById('step10');
                if (step10) step10.scrollIntoView({ behavior: 'smooth' });
            };
        } else {
            nextBtn.innerHTML = `<span>${dict.btnNextStage || 'Next Stage'}</span> →`;
            nextBtn.onclick = () => navigateWizard(1);
        }
    }

    if (counter) {
        const stageInfo = stageNames[currentWizardStage - 1] || stageNames[0];
        const stageTitle = currentLanguage === 'bn' ? stageInfo.bn : stageInfo.en;
        counter.textContent = `${dict.stagePrefix || 'Stage'} ${currentWizardStage} ${dict.stageOf || 'of'} 5: ${stageTitle}`;
    }
}

function goToStep10() {
    switchWizardStage(5);
    setTimeout(() => {
        const step10 = document.getElementById('step10');
        if (step10) {
            step10.scrollIntoView({ behavior: 'smooth' });
            step10.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.7)';
            setTimeout(() => { step10.style.boxShadow = ''; }, 1500);
        }
    }, 120);
}

// Window message listener for bridge polyfill calls inside preview iframe
window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'web2app-toast') {
        const toast = document.getElementById('phoneToast');
        if (toast) {
            toast.textContent = e.data.message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
        showNotification(e.data.message, 2000);
    }
});

// Explicitly register all handlers on window
window.switchWizardStage = switchWizardStage;
window.navigateWizard = navigateWizard;
window.toggleAllStepsView = toggleAllStepsView;
window.updateWizardControls = updateWizardControls;
window.goToStep10 = goToStep10;
window.loadTemplate = loadTemplate;
window.switchSourceTab = switchSourceTab;
window.insertComponent = insertComponent;
window.formatEditorCode = formatEditorCode;
window.loadSample = loadSample;
window.clearEditor = clearEditor;
window.handleFileUpload = handleFileUpload;
window.handleFolderUpload = handleFolderUpload;
window.reloadIndexIntoEditor = reloadIndexIntoEditor;
window.validateAppName = validateAppName;
window.validatePackageName = validatePackageName;
window.updatePreviews = updatePreviews;
window.updatePreview = updatePreview;
window.updateIconCanvas = updateIconCanvas;
window.downloadIconPng = downloadIconPng;
window.setIconShape = setIconShape;
window.setIconGradient = setIconGradient;
window.setIconGlyph = setIconGlyph;
window.handleCustomIconText = handleCustomIconText;
window.handleIconUpload = handleIconUpload;
window.toggleSplash = toggleSplash;
window.handleSplashUpload = handleSplashUpload;
window.renderSplashPreview = renderSplashPreview;
window.syncColorPicker = syncColorPicker;
window.toggleTopActionBar = toggleTopActionBar;
window.togglePreviewProgressBar = togglePreviewProgressBar;
window.toggleFloatingWidgetInputs = toggleFloatingWidgetInputs;
window.toggleBottomNavBuilder = toggleBottomNavBuilder;
window.updateBottomNavPreview = updateBottomNavPreview;
window.testSimulatedBridge = testSimulatedBridge;
window.handleOrientationChange = handleOrientationChange;
window.setPreviewOrientation = setPreviewOrientation;
window.togglePreviewFullscreen = togglePreviewFullscreen;
window.simulateBackPress = simulateBackPress;
window.toggleDeepLinkInputs = toggleDeepLinkInputs;
window.toggleAdMobInputs = toggleAdMobInputs;
window.toggleOneSignalInputs = toggleOneSignalInputs;
// Direct APK Compiler and Instant Downloader
async function buildDirectApk() {
    const appNameInput = document.getElementById('appName');
    const packageNameInput = document.getElementById('packageName');

    if (!validateAppName(appNameInput)) {
        showNotification("❌ Please provide a valid App Name!", 3000);
        return;
    }
    if (!validatePackageName(packageNameInput)) {
        showNotification("❌ Please provide a valid Package ID (e.g. com.company.app)!", 3000);
        return;
    }

    const appName = appNameInput.value.trim() || 'MyMobileApp';
    const packageName = packageNameInput.value.trim() || 'com.example.mymobileapp';
    const versionName = document.getElementById('versionName').value.trim() || '1.0.0';
    const versionCode = parseInt(document.getElementById('versionCode').value) || 1;
    const themeColor = document.getElementById('primaryColor').value || '#10b981';
    const orientation = document.getElementById('screenOrientation').value || 'portrait';
    const enableVibration = document.getElementById('permissionVibrate') ? document.getElementById('permissionVibrate').checked : true;
    const enableFileChooser = document.getElementById('enableFileChooser') ? document.getElementById('enableFileChooser').checked : true;
    const enableDownloadManager = document.getElementById('enableDownloadManager') ? document.getElementById('enableDownloadManager').checked : true;
    const splashTitle = document.getElementById('splashText') ? document.getElementById('splashText').value.trim() : appName;
    const splashBgColor = document.getElementById('primaryColor').value || '#0f172a';

    let html = '';
    let url = '';

    if (currentSourceMode === 'url') {
        url = document.getElementById('webUrl').value.trim();
        if (!url || !url.startsWith('http')) {
            showNotification("❌ Please enter a valid Website URL starting with http:// or https://", 3500);
            return;
        }
    } else {
        html = document.getElementById('htmlEditor').value.trim();
    }

    // Convert any uploaded zip files into transferrable array
    const filesArray = [];
    if (uploadedZipFiles) {
        for (const [filePath, buffer] of Object.entries(uploadedZipFiles)) {
            if (filePath.toLowerCase() === 'index.html') continue;
            let binary = '';
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            filesArray.push({
                name: filePath,
                content: btoa(binary),
                isBase64: true
            });
        }
    }

    // Include custom icon from Icon Canvas if available
    const iconCanvas = document.getElementById('iconCanvas');
    if (iconCanvas) {
        try {
            const dataUrl = iconCanvas.toDataURL('image/png');
            const iconBase64 = dataUrl.replace(/^data:image\/png;base64,/, '');
            if (iconBase64 && iconBase64.length > 50) {
                filesArray.push({
                    name: 'icon.png',
                    content: iconBase64,
                    isBase64: true
                });
            }
        } catch(e) {}
    }

    // Reset Modal UI
    openModal('apkBuildModal');
    const fill = document.getElementById('apkProgressFill');
    const statusText = document.getElementById('apkStatusText');
    const percentText = document.getElementById('apkPercentText');
    const successBox = document.getElementById('apkSuccessBox');
    
    if (successBox) successBox.style.display = 'none';
    if (fill) {
        fill.style.width = '10%';
        fill.style.background = 'linear-gradient(90deg, #10b981, #06b6d4)';
    }
    if (percentText) percentText.textContent = '10%';
    if (statusText) statusText.textContent = '📦 Packaging Web App & Assets...';

    const steps = [
        document.getElementById('apkStep1'),
        document.getElementById('apkStep2'),
        document.getElementById('apkStep3'),
        document.getElementById('apkStep4')
    ];
    const statuses = [
        document.getElementById('apkStep1Status'),
        document.getElementById('apkStep2Status'),
        document.getElementById('apkStep3Status'),
        document.getElementById('apkStep4Status')
    ];

    steps.forEach(s => { if (s) s.classList.remove('active', 'done'); });
    statuses.forEach(st => { if (st) st.textContent = '⏳'; });

    if (steps[0]) steps[0].classList.add('active');

    // Step 1 animation
    await new Promise(r => setTimeout(r, 350));
    if (steps[0]) {
        steps[0].classList.remove('active');
        steps[0].classList.add('done');
    }
    if (statuses[0]) statuses[0].textContent = '✅';
    if (fill) fill.style.width = '35%';
    if (percentText) percentText.textContent = '35%';
    if (statusText) statusText.textContent = '⚙️ Injecting Chromium WebView Core & Bridge...';

    // Step 2 animation
    if (steps[1]) steps[1].classList.add('active');
    await new Promise(r => setTimeout(r, 450));
    if (steps[1]) {
        steps[1].classList.remove('active');
        steps[1].classList.add('done');
    }
    if (statuses[1]) statuses[1].textContent = '✅';
    if (fill) fill.style.width = '65%';
    if (percentText) percentText.textContent = '65%';
    if (statusText) statusText.textContent = '🔐 Cryptographic Signing with v1 + v2/v3 Keystore...';

    // Step 3 animation
    if (steps[2]) steps[2].classList.add('active');
    await new Promise(r => setTimeout(r, 400));
    if (steps[2]) {
        steps[2].classList.remove('active');
        steps[2].classList.add('done');
    }
    if (statuses[2]) statuses[2].textContent = '✅';
    if (fill) fill.style.width = '85%';
    if (percentText) percentText.textContent = '85%';
    if (statusText) statusText.textContent = '🚀 Compiling Android Binary Package (.apk)...';
    if (steps[3]) steps[3].classList.add('active');

    try {
        const payload = {
            appName,
            packageName,
            versionName,
            versionCode,
            url,
            html,
            files: filesArray,
            themeColor,
            orientation,
            enableVibration,
            enableFileChooser,
            enableDownloadManager,
            splashTitle,
            splashBgColor
        };

        const response = await fetch('/api/build-apk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || errData.details || 'Server build failed.');
        }

        const blob = await response.blob();
        const safeName = (appName.toLowerCase().replace(/[^a-z0-9_-]/g, '_') || 'app') + '-release.apk';
        const downloadUrl = URL.createObjectURL(blob);

        // Complete progress
        if (steps[3]) {
            steps[3].classList.remove('active');
            steps[3].classList.add('done');
        }
        if (statuses[3]) statuses[3].textContent = '✅';
        if (fill) fill.style.width = '100%';
        if (percentText) percentText.textContent = '100%';
        if (statusText) statusText.textContent = '🎉 Build Successful! Downloading APK...';

        // Populate success box
        const appNameEl = document.getElementById('metaAppName');
        if (appNameEl) appNameEl.textContent = appName;
        const pkgEl = document.getElementById('metaPackageId');
        if (pkgEl) pkgEl.textContent = packageName;

        const manualBtn = document.getElementById('apkManualDownloadBtn');
        if (manualBtn) {
            manualBtn.href = downloadUrl;
            manualBtn.download = safeName;
        }
        if (successBox) successBox.style.display = 'block';

        // Auto trigger download
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = safeName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        showNotification(`🎉 ${safeName} downloaded! Ready to install on Android.`, 4500);

    } catch (err) {
        console.error('APK build error:', err);
        if (statusText) statusText.textContent = '❌ ' + (err.message || 'Build failed');
        if (percentText) percentText.textContent = 'Error';
        if (fill) fill.style.background = '#ef4444';
        showNotification('❌ APK Build error: ' + err.message, 5000);
    }
}

window.buildDirectApk = buildDirectApk;
window.generateProject = generateProject;
window.exportSingleHtml = exportSingleHtml;
window.exportPwaZip = exportPwaZip;
window.resetForm = resetForm;
window.openHealthAuditModal = openHealthAuditModal;
window.runHealthAudit = runHealthAudit;
window.openModal = openModal;
window.closeModal = closeModal;
window.switchLanguage = switchLanguage;

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    applyTheme(currentTheme);
    applyZoom(currentZoom);
    updateWizardControls();
    loadTemplate('ecommerce');
    updateIconCanvas();
    updateQrCode();
    initDragAndDrop();

    document.getElementById('appName').addEventListener('input', function(e) {
        validateAppName(e.target);
        updatePreviews();
    });

    document.getElementById('packageName').addEventListener('input', function(e) {
        validatePackageName(e.target);
        updateFileStructure(e.target.value);
    });

    document.getElementById('webUrl').addEventListener('input', function() {
        updatePreviews();
        updateQrCode();
    });

    const floatTypeEl = document.getElementById('floatingWidgetType');
    if (floatTypeEl) floatTypeEl.addEventListener('change', updatePreview);
    const floatNumEl = document.getElementById('floatingWidgetNumber');
    if (floatNumEl) floatNumEl.addEventListener('input', updatePreview);

    setTimeout(() => {
        showNotification('🚀 Web2App Studio Pro ready with Cyber Dark & Step Wizard!', 2500);
    }, 600);
});
