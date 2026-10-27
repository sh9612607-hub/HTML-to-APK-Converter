// Web2App Studio Pro - Complete Engine with All-in-One Capabilities
let currentLanguage = 'en';
let currentSourceMode = 'editor'; // 'editor' | 'upload' | 'url'
let uploadedZipFiles = null; // Map of { relativePath: ArrayBuffer }

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
        btnGenAndroid: "Generate Android Project (ZIP)",
        btnDownloadHtml: "Download Single HTML App",
        btnDownloadPwa: "Download PWA Package",
        btnCloudBuild: "Free Cloud APK (GitHub)",
        btnReset: "Reset All",
        loadingText: "Generating complete Android Studio project with all features & icons...",
        mockupHeader: "Live Interactive Mobile Mockup",
        qrTitle: "Scan to Test on Real Phone",
        qrDesc: "Scan with your phone camera to test this web application directly on your device before downloading the Android project.",
        fileStructureTitle: "Generated Project Structure",
        buildHelpTitle: "💡 How to Build APK:",
        buildHelpSteps: "1. Click Generate Android Project to download the ZIP.<br>2. Extract the ZIP on your PC.<br>3. Open Android Studio and select File > Open on the extracted folder.<br>4. Let Gradle sync, then click Build > Build Bundle(s) / APK(s) > Build APK(s).<br><em>No Android Studio? Use our included GitHub Actions workflow for 100% free cloud APK compilation!</em>"
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
        btnGenAndroid: "অ্যান্ড্রয়েড প্রজেক্ট জিপ তৈরি করুন (ZIP)",
        btnDownloadHtml: "সিঙ্গেল HTML অ্যাপ ডাউনলোড করুন",
        btnDownloadPwa: "PWA প্যাকেজ ডাউনলোড করুন",
        btnCloudBuild: "ফ্রি ক্লাউড APK (গিটহাব)",
        btnReset: "রিসেট করুন",
        loadingText: "সব ফিচার ও আইকন সহ অ্যান্ড্রয়েড স্টুডিও প্রজেক্ট তৈরি হচ্ছে...",
        mockupHeader: "লাইভ মোবাইল মকআপ প্রিভিউ",
        qrTitle: "আসল ফোনে সরাসরি টেস্ট করুন",
        qrDesc: "আপনার ফোনের ক্যামেরা দিয়ে কিউআর কোড স্ক্যান করে অ্যাপটি সরাসরি চালিয়ে দেখুন।",
        fileStructureTitle: "তৈরিকৃত প্রজেক্ট ফাইলের স্ট্রাকচার",
        buildHelpTitle: "💡 কীভাবে APK বিল্ড করবেন:",
        buildHelpSteps: "১. 'অ্যান্ড্রয়েড প্রজেক্ট জিপ তৈরি করুন' বাটনে ক্লিক করে ZIP ডাউনলোড করুন।<br>২. আপনার কম্পিউটারে ZIP ফাইলটি আনজিপ (Extract) করুন।<br>৩. Android Studio সফটওয়্যারটি ওপেন করে File > Open দিয়ে ফোল্ডারটি ওপেন করুন।<br>৪. Gradle সিঙ্ক শেষ হলে মেনু থেকে Build > Build Bundle(s) / APK(s) > Build APK(s) ক্লিক করুন।<br><em>কম্পিউটার না থাকলেও চিন্তার কারণ নেই! আমাদের ফাইলে <strong>GitHub Actions</strong> দেওয়া আছে যা গিটহাবে আপলোড করলেই ফ্রিতে সরাসরি APK বিল্ড করে দেয়!</em>"
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
    }
};

function loadTemplate(tplKey) {
    const tpl = appTemplates[tplKey];
    if (!tpl) return;

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

    updateIconCanvas();
    updatePreview();
    updateFileStructure(tpl.packageName);
    showNotification(`✨ Loaded ${tpl.appName} template!`, 3000);
}

// Visual UI Component Inserter
function insertComponent(type) {
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
    } else if (shape === 'squircle') {
        const r = w * 0.28;
        ctx.roundRect(4, 4, w - 8, h - 8, r);
    } else if (shape === 'rounded') {
        const r = w * 0.18;
        ctx.roundRect(4, 4, w - 8, h - 8, r);
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
            uploadedZipFiles = {};
            let indexHtmlFound = false;
            let fileCount = 0;
            const promises = [];

            zip.forEach((relativePath, zipEntry) => {
                if (!zipEntry.dir) {
                    fileCount++;
                    if (relativePath.toLowerCase() === 'index.html' || relativePath.toLowerCase().endsWith('/index.html')) {
                        indexHtmlFound = true;
                    }
                    promises.push(
                        zipEntry.async('arraybuffer').then(buf => {
                            uploadedZipFiles[relativePath] = buf;
                        })
                    );
                }
            });

            await Promise.all(promises);

            for (const [path, buffer] of Object.entries(uploadedZipFiles)) {
                if (path.toLowerCase().endsWith('index.html')) {
                    const text = new TextDecoder().decode(buffer);
                    document.getElementById('htmlEditor').value = text;
                    break;
                }
            }

            statusDiv.innerHTML = `<span style="color: #10b981; font-weight: 700;">✅ Loaded ZIP with ${fileCount} files${indexHtmlFound ? ' (index.html found)' : ''}!</span>`;
            updatePreview();
            showNotification(`📦 ${file.name} extracted successfully with ${fileCount} files!`, 3500);
        } catch (err) {
            console.error('ZIP read error:', err);
            statusDiv.innerHTML = `<span style="color: #ef4444;">❌ Failed to read ZIP file: ${err.message}</span>`;
            uploadedZipFiles = null;
        }
    } else {
        uploadedZipFiles = null;
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

function toggleSplash() {
    const splashConfig = document.getElementById('splashConfig');
    splashConfig.style.display = document.getElementById('enableSplash').checked ? 'block' : 'none';
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
    if (orientation === 'landscape') {
        mockup.classList.add('landscape');
        pBtn.classList.remove('active');
        lBtn.classList.add('active');
    } else {
        mockup.classList.remove('landscape');
        lBtn.classList.remove('active');
        pBtn.classList.add('active');
    }
}

let backPressTimer = null;
function simulateBackPress() {
    const toast = document.getElementById('phoneToast');
    if (backPressTimer) {
        clearTimeout(backPressTimer);
        backPressTimer = null;
        toast.textContent = "Exiting app 👋";
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1500);
    } else {
        toast.textContent = "Press back again to exit";
        toast.classList.add('show');
        backPressTimer = setTimeout(() => {
            toast.classList.remove('show');
            backPressTimer = null;
        }, 2000);
    }
}

function testSimulatedBridge(action) {
    const toast = document.getElementById('phoneToast');
    if (action === 'toast') {
        toast.textContent = "Native Android Toast: Hello! 👋";
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    } else if (action === 'vibrate') {
        if (navigator.vibrate) navigator.vibrate(100);
        toast.textContent = "📳 Haptic Vibrate (100ms)";
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1500);
    } else if (action === 'share') {
        toast.textContent = "📤 Android Native Share Sheet Opened";
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}

function updatePreviews(isColorChange = false) {
    const appName = document.getElementById('appName').value || 'MyMobileApp';
    const primaryColor = document.getElementById('primaryColor').value;
    
    document.getElementById('phoneActionBar').textContent = appName;
    document.getElementById('phoneActionBar').style.background = primaryColor;
    
    if (isColorChange) {
        document.getElementById('primaryColorText').value = primaryColor;
    }
    
    updatePreview();
    updateQrCode();
}

function updatePreview() {
    triggerPreviewLoading();
    toggleTopActionBar();

    const previewFrame = document.getElementById('phonePreview');
    if (currentSourceMode === 'url') {
        let url = document.getElementById('webUrl').value.trim() || 'https://example.com';
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        // In real Android app, NO URL address bar exists at all!
        // We render a pure full-screen iframe just like the actual Android WebView.
        previewFrame.innerHTML = `
            <iframe src="${url}" style="width: 100%; height: 100%; border: none; background: white; display: block;" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>`;
        return;
    }

    const htmlContent = document.getElementById('htmlEditor').value;
    if (!htmlContent.trim()) {
        previewFrame.innerHTML = '<div style="text-align: center; padding: 2rem; color: #94a3b8;"><p>Enter HTML content and click "Refresh Preview"</p></div>';
        return;
    }

    try {
        const tempIframe = document.createElement('iframe');
        tempIframe.style.cssText = 'width:100%;height:100%;border:none;';
        tempIframe.sandbox = 'allow-scripts allow-same-origin allow-popups';
        previewFrame.innerHTML = '';
        previewFrame.appendChild(tempIframe);
        
        // Inject AndroidBridge Polyfill inside the preview iframe
        const bridgePolyfill = `
<script>
window.AndroidBridge = {
    showToast: function(msg) {
        var t = parent.document.getElementById('phoneToast');
        if(t){ t.textContent = msg; t.classList.add('show'); setTimeout(function(){ t.classList.remove('show'); }, 2000); }
    },
    vibrate: function(ms) {
        if (navigator.vibrate) navigator.vibrate(ms || 50);
        var t = parent.document.getElementById('phoneToast');
        if(t){ t.textContent = '📳 Vibration: ' + (ms || 50) + 'ms'; t.classList.add('show'); setTimeout(function(){ t.classList.remove('show'); }, 1200); }
    },
    shareText: function(text, title) {
        if(navigator.share) { navigator.share({ title: title, text: text }); }
        else { alert('Share: ' + text); }
    },
    copyToClipboard: function(text) {
        if (navigator.clipboard) navigator.clipboard.writeText(text);
        var t = parent.document.getElementById('phoneToast');
        if(t){ t.textContent = '📋 Copied to clipboard!'; t.classList.add('show'); setTimeout(function(){ t.classList.remove('show'); }, 1500); }
    },
    openExternal: function(url) { window.open(url, '_blank'); },
    getAppVersion: function() { return '1.0.0'; }
};
<\/script>
`;

        const iframeDoc = tempIframe.contentDocument;
        iframeDoc.open();
        let contentToWrite = htmlContent;
        if (contentToWrite.includes('<head>')) {
            contentToWrite = contentToWrite.replace('<head>', '<head>' + bridgePolyfill);
        } else {
            contentToWrite = bridgePolyfill + contentToWrite;
        }
        iframeDoc.write(contentToWrite);
        iframeDoc.close();
    } catch (error) {
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

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    loadTemplate('ecommerce');
    updateIconCanvas();
    updateQrCode();

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

    setTimeout(() => {
        showNotification('🚀 Web2App Studio Pro ready with all features!', 2500);
    }, 600);
});
