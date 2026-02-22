// script.js - ألواح الرافدين
// اللعبة الروحانية العراقية

// ===== تهيئة المتغيرات العالمية =====
let currentLevel = 1;
let fingerprintsCount = 0;
let isAnimating = false;
let audioContext = null;
let spiritualAudio = null;

// بيانات المستويات السبعة
const levelsData = [
    {
        id: 1,
        name: "وركاء",
        subtitle: "حيث بدأ كل شيء",
        poem: "مدينة السومريين القدماء... هنا اخترعت الكتابة، لتكتب أنت الآن رسالتك لجدك",
        kufiLetter: "𒀭", // رمز سومري للإله
        requiredFingerprints: 3,
        bgColor: "#C36A2D",
        shadowIntensity: 0.8
    },
    {
        id: 2,
        name: "أهوار الجنوب",
        subtitle: "الماء الذي يكتب",
        poem: "بين القصب والماء... كل قطرة تحكي قصة سومر",
        kufiLetter: "𒀀", // رمز سومري للماء
        requiredFingerprints: 4,
        bgColor: "#1E3D58",
        shadowIntensity: 0.9
    },
    {
        id: 3,
        name: "بغداد المستديرة",
        subtitle: "مدينة السلام",
        poem: "دار السلام... حيث كانت بغداد قبلة العالم",
        kufiLetter: "ب",
        requiredFingerprints: 5,
        bgColor: "#FFD700",
        shadowIntensity: 0.7
    },
    {
        id: 4,
        name: "سامراء",
        subtitle: "المئذنة الملوية",
        poem: "تصعد السلم حلزونياً... كل دورة تأخذك قرناً إلى الوراء",
        kufiLetter: "س",
        requiredFingerprints: 5,
        bgColor: "#8B4A1D",
        shadowIntensity: 0.85
    },
    {
        id: 5,
        name: "كربلاء",
        subtitle: "وردة على الرمل",
        poem: "لا تعليق... فقط صمت وناي بعيد",
        kufiLetter: "ك",
        requiredFingerprints: 6,
        bgColor: "#C36A2D",
        shadowIntensity: 0.95
    },
    {
        id: 6,
        name: "بابل",
        subtitle: "بوابة لا تذهب لأحد",
        poem: "بوابة عشتار... من دخلها خرج في زمن آخر",
        kufiLetter: "𒂍", // رمز سومري للمعبد
        requiredFingerprints: 6,
        bgColor: "#1E3D58",
        shadowIntensity: 0.8
    },
    {
        id: 7,
        name: "العراق في قلبي",
        subtitle: "الذاكرة",
        poem: "هنا لا تحتاج بصمات... فقط دقيقة صمت",
        kufiLetter: "أ",
        requiredFingerprints: 1, // بصمة واحدة فقط، ثم يختتم
        bgColor: "#0A0A1A",
        shadowIntensity: 1
    }
];

// ===== نظام الصوت الروحاني =====
function initSpiritualAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // سنستخدم Web Audio API لتوليد أصوات موسيقية بسيطة
        // بدلاً من ملفات خارجية (لتجنب مشاكل التحميل)
        console.log("🎵 نظام الصوت الروحاني جاهز");
    } catch (e) {
        console.log("⚠️ المتصفح لا يدعم الصوت المتقدم");
    }
}

function playSpiritualSound(type) {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine'; // موجة جيبية ناعمة
    oscillator.frequency.value = type === 'nay' ? 440 : 220;
    
    gainNode.gain.value = 0.1;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 2);
}

// ===== إنشاء الغبار الذهبي العائم =====
function createFloatingDust(container) {
    for (let i = 0; i < 30; i++) {
        const dust = document.createElement('div');
        dust.className = 'floating-dust';
        dust.style.left = Math.random() * 100 + '%';
        dust.style.top = Math.random() * 100 + '%';
        dust.style.animation = `float ${8 + Math.random() * 12}s linear infinite`;
        dust.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(dust);
    }
}

// ===== إنشاء بصمة ذهبية =====
function createFingerprint(x, y, container) {
    const fingerprint = document.createElement('div');
    fingerprint.className = 'fingerprint';
    fingerprint.style.left = (x - 30) + 'px';
    fingerprint.style.top = (y - 30) + 'px';
    container.appendChild(fingerprint);
    
    // تشغيل صوت خفيف عند البصمة
    playSpiritualSound('fingerprint');
    
    setTimeout(() => {
        fingerprint.remove();
    }, 2500);
}

// ===== إنشاء قطرات دموع للحرف الكوفي =====
function createKufiTears(container) {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const tear = document.createElement('div');
            tear.className = 'tear-drop';
            tear.style.left = (40 + Math.random() * 20) + '%';
            tear.style.animation = `tearFall ${1 + Math.random()}s ease-in forwards`;
            container.appendChild(tear);
            
           
