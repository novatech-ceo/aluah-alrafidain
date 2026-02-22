// script.js - ألواح الرافدين (الكود الكامل)
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
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine'; // موجة جيبية ناعمة
        oscillator.frequency.value = type === 'nay' ? 440 : 220;
        
        gainNode.gain.value = 0.1;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 2);
    } catch (e) {
        console.log("⚠️ خطأ في تشغيل الصوت");
    }
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
            
            setTimeout(() => tear.remove(), 2000);
        }, i * 300);
    }
}

// ===== تحريك اللاعب والظل =====
function movePlayer(x, y, tablet, player, shadow) {
    const rect = tablet.getBoundingClientRect();
    const tabletX = x - rect.left;
    const tabletY = y - rect.top;
    
    // التأكد من بقاء اللاعب داخل اللوح
    const boundedX = Math.max(15, Math.min(tabletX, rect.width - 15));
    const boundedY = Math.max(15, Math.min(tabletY, rect.height - 15));
    
    player.style.left = boundedX + 'px';
    player.style.top = boundedY + 'px';
    
    // تحريك الظل خلف اللاعب (تأخير بسيط)
    setTimeout(() => {
        shadow.style.left = (boundedX - 5) + 'px';
        shadow.style.top = (boundedY + 20) + 'px';
    }, 150);
}

// ===== تأثير انحناء اللوح =====
function bendTablet(tablet, direction) {
    if (isAnimating) return;
    
    isAnimating = true;
    
    if (direction === 'fold') {
        tablet.style.transform = 'rotateX(20deg) rotateY(10deg) scale(0.98)';
    } else if (direction === 'unfold') {
        tablet.style.transform = 'rotateX(-15deg) rotateY(-10deg) scale(1.02)';
    } else {
        tablet.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    }
    
    setTimeout(() => {
        isAnimating = false;
    }, 1500);
}

// ===== إكمال المستوى =====
function completeLevel(levelId) {
    const levelComplete = document.getElementById('level-complete');
    const completeKufi = document.getElementById('complete-kufi-letter');
    const completeMessage = document.getElementById('complete-message');
    const completePoem = document.getElementById('complete-poem');
    
    const level = levelsData[levelId - 1];
    
    completeKufi.innerHTML = level.kufiLetter;
    completeMessage.textContent = level.name;
    completePoem.textContent = level.poem;
    
    // إنشاء دموع الحرف
    createKufiTears(completeKufi);
    
    // تشغيل صوت الناي
    playSpiritualSound('nay');
    
    // إظهار الشاشة
    levelComplete.style.display = 'flex';
    
    // تخزين التقدم
    localStorage.setItem('lastLevel', levelId);
    
    // إذا كان المستوى الأخير، جهز النهاية العظمى
    if (levelId === 7) {
        setTimeout(() => {
            levelComplete.style.display = 'none';
            document.getElementById('grand-finale').style.display = 'flex';
        }, 3000);
    }
}

// ===== تحميل المستوى =====
function loadLevel(levelId) {
    currentLevel = levelId;
    fingerprintsCount = 0;
    
    const gameScreen = document.getElementById('game-screen');
    const levelsScreen = document.getElementById('levels-screen');
    const levelTitle = document.getElementById('level-title');
    const levelSubtitle = document.getElementById('level-subtitle');
    const tablet = document.getElementById('tablet');
    const instructionText = document.getElementById('instruction-text');
    
    const level = levelsData[levelId - 1];
    
    levelTitle.textContent = level.name;
    levelSubtitle.textContent = level.subtitle;
    instructionText.textContent = `📍 اضغط ${level.requiredFingerprints} مرات لترك بصمتك`;
    
    // تغيير خلفية اللوح حسب المستوى
    tablet.style.background = `linear-gradient(135deg, ${level.bgColor} 0%, #A65824 100%)`;
    
    // إخفاء شاشة المستويات وإظهار اللعبة
    levelsScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    
    // إعادة تعيين موقع اللاعب
    const player = document.getElementById('player');
    const shadow = document.getElementById('shadow');
    
    player.style.left = '50%';
    player.style.top = '50%';
    shadow.style.left = 'calc(50% - 5px)';
    shadow.style.top = 'calc(50% + 20px)';
    
    // إنشاء عناصر خاصة بالمستوى
    createLevelElements(levelId);
    
    // تشغيل موسيقى خلفية خفيفة
    if (levelId === 7) {
        playSpiritualSound('nay');
    }
}

// ===== إنشاء عناصر خاصة بكل مستوى =====
function createLevelElements(levelId) {
    const levelElements = document.getElementById('level-elements');
    levelElements.innerHTML = ''; // تنظيف العناصر السابقة
    
    switch(levelId) {
        case 1: // وركاء - زقورات
            for (let i = 0; i < 5; i++) {
                const ziggurat = document.createElement('div');
                ziggurat.className = 'level-element ziggurat';
                ziggurat.style.left = (10 + i * 20) + '%';
                ziggurat.style.bottom = '10%';
                ziggurat.style.width = (60 + Math.random() * 40) + 'px';
                ziggurat.style.height = (100 + Math.random() * 50) + 'px';
                levelElements.appendChild(ziggurat);
            }
            break;
            
        case 2: // أهوار - قصب
            for (let i = 0; i < 20; i++) {
                const reed = document.createElement('div');
                reed.className = 'level-element reeds';
                reed.style.left = (Math.random() * 100) + '%';
                reed.style.bottom = '5%';
                reed.style.height = (50 + Math.random() * 80) + 'px';
                levelElements.appendChild(reed);
            }
            
            // إضافة انعكاس الماء
            const reflection = document.createElement('div');
            reflection.className = 'level-element water-reflection';
            reflection.style.bottom = '10%';
            levelElements.appendChild(reflection);
            break;
            
        case 3: // بغداد - دائرة
            const circle = document.createElement('div');
            circle.style.position = 'absolute';
            circle.style.width = '200px';
            circle.style.height = '200px';
            circle.style.border = '4px solid rgba(255,215,0,0.3)';
            circle.style.borderRadius = '50%';
            circle.style.left = '50%';
            circle.style.top = '50%';
            circle.style.transform = 'translate(-50%, -50%)';
            levelElements.appendChild(circle);
            break;
            
        case 4: // سامراء - حلزوني
            for (let i = 0; i < 10; i++) {
                const spiral = document.createElement('div');
                spiral.style.position = 'absolute';
                spiral.style.width = (200 - i * 15) + 'px';
                spiral.style.height = (200 - i * 15) + 'px';
                spiral.style.border = '2px solid rgba(255,215,0,0.2)';
                spiral.style.borderRadius = '50%';
                spiral.style.left = '50%';
                spiral.style.top = '50%';
                spiral.style.transform = 'translate(-50%, -50%)';
                spiral.style.opacity = 0.1 + i * 0.05;
                levelElements.appendChild(spiral);
            }
            break;
            
        case 5: // كربلاء - وردة
            for (let i = 0; i < 8; i++) {
                const petal = document.createElement('div');
                petal.style.position = 'absolute';
                petal.style.width = '60px';
                petal.style.height = '120px';
                petal.style.background = 'radial-gradient(circle at 50% 0%, rgba(255,215,0,0.2), transparent)';
                petal.style.left = '50%';
                petal.style.top = '30%';
                petal.style.transformOrigin = 'bottom center';
                petal.style.transform = `translateX(-50%) rotate(${i * 45}deg)`;
                levelElements.appendChild(petal);
            }
            break;
            
        case 6: // بابل - بوابة
            const gate = document.createElement('div');
            gate.style.position = 'absolute';
            gate.style.width = '100px';
            gate.style.height = '150px';
            gate.style.background = 'linear-gradient(135deg, #1E3D58, #FFD700)';
            gate.style.left = '50%';
            gate.style.top = '50%';
            gate.style.transform = 'translate(-50%, -50%)';
            gate.style.opacity = 0.3;
            gate.style.borderRadius = '50px 50px 0 0';
            levelElements.appendChild(gate);
            break;
            
        case 7: // الذاكرة - لا شيء، فقط ضوء
            const light = document.createElement('div');
            light.style.position = 'absolute';
            light.style.width = '300px';
            light.style.height = '300px';
            light.style.background = 'radial-gradient(circle, rgba(255,215,0,0.2), transparent)';
            light.style.left = '50%';
            light.style.top = '50%';
            light.style.transform = 'translate(-50%, -50%)';
            light.style.animation = 'float 6s ease-in-out infinite';
            levelElements.appendChild(light);
            break;
    }
}

// ===== النهاية العظمى =====
function showGrandFinale() {
    document.getElementById('grand-finale').style.display = 'flex';
    playSpiritualSound('nay');
}

// ===== إعادة تشغيل الملحمة =====
function restartSaga() {
    document.getElementById('grand-finale').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('level-complete').style.display = 'none';
    document.getElementById('levels-screen').style.display = 'block';
    
    // إعادة تعيين المستوى الحالي
    currentLevel = 1;
    fingerprintsCount = 0;
    
    // إعادة تعيين موقع اللاعب
    const player = document.getElementById('player');
    const shadow = document.getElementById('shadow');
    player.style.left = '50%';
    player.style.top = '50%';
    shadow.style.left = 'calc(50% - 5px)';
    shadow.style.top = 'calc(50% + 20px)';
}

// ===== تهيئة اللعبة عند التحميل =====
window.addEventListener('load', () => {
    // تهيئة الصوت
    initSpiritualAudio();
    
    // إنشاء الغبار الذهبي في شاشة البداية
    const dustContainer = document.querySelector('.floating-dust-container');
    if (dustContainer) {
        createFloatingDust(dustContainer);
    }
    
    // حدث بدء الرحلة
    document.getElementById('start-journey').addEventListener('click', () => {
        document.getElementById('splash-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
            document.getElementById('levels-screen').style.display = 'block';
        }, 1500);
    });
    
    // أحداث بطاقات المستويات
    document.querySelectorAll('.tablet-card').forEach(card => {
        card.addEventListener('click', () => {
            const level = card.dataset.level;
            loadLevel(parseInt(level));
        });
    });
    
    // حدث العودة للمستويات
    document.getElementById('back-to-levels').addEventListener('click', () => {
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('levels-screen').style.display = 'block';
    });
    
    // حدث الضغط على اللوح
    const tablet = document.getElementById('tablet');
    const player = document.getElementById('player');
    const shadow = document.getElementById('shadow');
    
    tablet.addEventListener('click', (e) => {
        // الحصول على إحداثيات النقر
        const rect = tablet.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // إنشاء بصمة
        createFingerprint(x, y, tablet);
        
        // تحريك اللاعب
        movePlayer(e.clientX, e.clientY, tablet, player, shadow);
        
        // زيادة عداد البصمات
        fingerprintsCount++;
        
        // التحقق من إكمال المستوى
        const level = levelsData[currentLevel - 1];
        if (fingerprintsCount >= level.requiredFingerprints) {
            completeLevel(currentLevel);
        }
        
        // تأثير انحناء عشوائي
        if (Math.random() > 0.7) {
            bendTablet(tablet, Math.random() > 0.5 ? 'fold' : 'unfold');
        }
    });
    
    // حدث التالي بعد إكمال المستوى
    document.getElementById('next-level-btn').addEventListener('click', () => {
        document.getElementById('level-complete').style.display = 'none';
        
        if (currentLevel < 7) {
            currentLevel++;
            loadLevel(currentLevel);
        } else {
            showGrandFinale();
        }
    });
    
    // حدث إعادة التشغيل
    document.getElementById('restart-saga').addEventListener('click', restartSaga);
    
    // تحميل آخر مستوى محفوظ (اختياري)
    const lastLevel = localStorage.getItem('lastLevel');
    if (lastLevel && confirm('هل تريد الاستمرار من حيث توقفت؟')) {
        loadLevel(parseInt(lastLevel));
    }
});
