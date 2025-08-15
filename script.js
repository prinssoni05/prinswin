const firebaseConfig = { apiKey: "AIzaSyA_C5-1k40B2an8h3nTFkRflO4d4ZS6JWQ", authDomain: "mahadivya-panchang.firebaseapp.com", projectId: "mahadivya-panchang", storageBucket: "mahadivya-panchang.appspot.com", messagingSenderId: "336726728626", appId: "1:336726728626:web:9d165e3b429fe1b529ceab" };
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const appContainer = document.getElementById('app-container');
const BACKEND_URL = 'https://prinswin.onrender.com'; // सर्वर का पता सीधे यहाँ है!

const renderLoginScreen = () => {
    appContainer.innerHTML = `
        <div class="login-screen">
            <h2 id="form-title">लॉगिन करें</h2>
            <input type="email" id="email-input" placeholder="ईमेल डालें" required>
            <input type="password" id="password-input" placeholder="पासवर्ड" required>
            <button id="submit-btn">लॉगिन</button>
        </div>
    `;
    // लॉगिन का लॉजिक यहाँ आएगा
};

const renderHomeScreen = (user) => {
    appContainer.innerHTML = `
        <header class="main-header">
            <div class="logo"><h1>PrinsWin</h1></div>
            <div class="user-info"><i class="fas fa-wallet"></i><span id="wallet-balance">₹0.00</span></div>
        </header>
        <main class="game-lobby">
            <h2>गेम चुनें</h2>
            <div class="game-card" id="color-quiz-game"><i class="fas fa-palette"></i><h3>कलर क्विज़</h3></div>
        </main>
        <div class="game-screen">
            <button id="close-game-btn" class="close-btn">&times;</button>
            <h2>कलर क्विज़ टूर्नामेंट</h2>
            <p id="timer-text">कनेक्ट हो रहा है...</p>
        </div>
    `;
    
    document.getElementById('color-quiz-game').addEventListener('click', () => {
        document.querySelector('.game-screen').classList.add('visible');
    });

    document.getElementById('close-game-btn').addEventListener('click', () => {
         document.querySelector('.game-screen').classList.remove('visible');
    });

    setInterval(async () => {
        try {
            const response = await fetch(BACKEND_URL + '/game-state');
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

auth.onAuthStateChanged(user => {
    if (user) {
        renderHomeScreen(user);
    } else {
        renderLoginScreen();
    }
});
