// ============== Firebase की शुरुआत ==============
const firebaseConfig = { 
    apiKey: "AIzaSyA_C5-1k40B2an8h3nTFkRflO4d4ZS6JWQ", 
    authDomain: "mahadivya-panchang.firebaseapp.com", 
    projectId: "mahadivya-panchang", 
    storageBucket: "mahadivya-panchang.appspot.com", 
    messagingSenderId: "336726728626", 
    appId: "1:336726728626:web:9d165e3b429fe1b529ceab"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const appContainer = document.getElementById('app-container');

// ============== बैकएंड सर्वर का पता (पहले से सेट) ==============
const BACKEND_URL = 'https://prinswin.onrender.com';

// ============== HTML टेम्पलेट्स (Screens) ==============
const loadingScreenHTML = `<div class="loading-screen">लोड हो रहा है...</div>`;

const loginScreenHTML = `
    <div class="login-screen">
        <h2 id="form-title">लॉगिन करें</h2>
        <input type="email" id="email-input" placeholder="ईमेल डालें" required>
        <input type="password" id="password-input" placeholder="पासवर्ड" required>
        <input type="password" id="confirm-password-input" placeholder="पासवर्ड कन्फर्म करें" style="display: none;">
        <button id="submit-btn">लॉगिन</button>
        <p id="toggle-form-btn" class="toggle-form">नया अकाउंट है? रजिस्टर करें</p>
    </div>
`;

const homeScreenHTML = `
    <header class="main-header">
        <div class="logo"><h1>PrinsWin</h1></div>
        <div class="user-info"><i class="fas fa-wallet"></i><span id="wallet-balance">₹0.00</span></div>
    </header>
    <main class="game-lobby">
        <h2>गेम चुनें</h2>
        <div class="game-card" id="color-quiz-game"><i class="fas fa-palette"></i><h3>कलर क्विज़</h3></div>
        <div class="game-card disabled"><i class="fas fa-calculator"></i><h3>नंबर पहेली</h3><p>जल्द आ रहा है...</p></div>
    </main>
    <p class="credits">निर्माता: प्रिंस सोनी</p>
    <footer class="bottom-nav">
         <a href="#" class="nav-item active"><i class="fas fa-home"></i><span>होम</span></a>
         <a href="#" class="nav-item" id="logout-btn"><i class="fas fa-sign-out-alt"></i><span>लॉगआउट</span></a>
    </footer>
    <div class="game-screen">
        <button id="close-game-btn" class="close-btn">&times;</button>
        <h2>कलर क्विज़ टूर्नामेंट</h2>
        <p id="timer-text">सर्वर से कनेक्ट हो रहा है...</p>
    </div>
`;

// ============== स्क्रीन को दिखाने वाले फंक्शन्स ==============

const renderLoginScreen = () => {
    appContainer.innerHTML = loginScreenHTML;
    attachLoginListeners();
};

const renderHomeScreen = (user) => {
    appContainer.innerHTML = homeScreenHTML;
    attachHomeListeners(user);
    startTimerUpdates();
};

// ============== इवेंट्स को जोड़ने वाले फंक्शन्स ==============

const attachLoginListeners = () => {
    const submitBtn = document.getElementById('submit-btn');
    const toggleBtn = document.getElementById('toggle-form-btn');
    let isRegister = false;

    toggleBtn.addEventListener('click', () => {
        isRegister = !isRegister;
        document.getElementById('form-title').textContent = isRegister ? 'रजिस्टर करें' : 'लॉगिन करें';
        document.getElementById('confirm-password-input').style.display = isRegister ? 'block' : 'none';
        submitBtn.textContent = isRegister ? 'रजिस्टर' : 'लॉगिन';
        toggleBtn.textContent = isRegister ? 'पहले से अकाउंट है? लॉगिन करें' : 'नया अकाउंट है? रजिस्टर करें';
    });
    
    submitBtn.addEventListener('click', () => {
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;
        if(isRegister){
            const confirmPassword = document.getElementById('confirm-password-input').value;
            if(password !== confirmPassword){
                alert("पासवर्ड मेल नहीं खा रहे हैं!");
                return;
            }
            auth.createUserWithEmailAndPassword(email, password).catch(err => alert(err.message));
        } else {
            auth.signInWithEmailAndPassword(email, password).catch(err => alert(err.message));
        }
    });
};

const attachHomeListeners = (user) => {
    document.getElementById('logout-btn').addEventListener('click', () => auth.signOut());
    
    document.getElementById('color-quiz-game').addEventListener('click', () => {
        document.querySelector('.game-screen').classList.add('visible');
    });

    document.getElementById('close-game-btn').addEventListener('click', () => {
         document.querySelector('.game-screen').classList.remove('visible');
    });
};

// ============== मुख्य लॉजिक ==============

const startTimerUpdates = () => {
    setInterval(async () => {
        const gameScreen = document.querySelector('.game-screen');
        if (!gameScreen || !gameScreen.classList.contains('visible')) return;
        
        try {
            const response = await fetch(BACKEND_URL + '/game-state');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const timerText = document.getElementById('timer-text');
            if (timerText) {
                const minutes = Math.floor(data.timer / 60);
                let seconds = data.timer % 60;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                timerText.textContent = `${minutes}:${seconds}`;
            }
        } catch (error) {
            const timerText = document.getElementById('timer-text');
            if(timerText) timerText.textContent = 'सर्वर से कनेक्ट नहीं हो सका...';
        }
    }, 1000);
};

// ============== ऐप की शुरुआत ==============

auth.onAuthStateChanged(user => {
    appContainer.innerHTML = loadingScreenHTML;
    setTimeout(() => {
        if (user) {
            renderHomeScreen(user);
        } else {
            renderLoginScreen();
        }
    }, 500);
});
