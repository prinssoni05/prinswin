:root { --primary-color: #483d8b; --secondary-color: #ffd700; --background-color: #121212; --card-bg: #1e1e1e; --text-color: #ffffff; --shadow: 0 4px 15px rgba(0, 0, 0, 0.4); --green: #4caf50; --violet: #9c27b0; --red: #f44336; }
body { margin: 0; font-family: 'Poppins', sans-serif; background-color: var(--background-color); color: var(--text-color); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
.container { max-width: 400px; margin: 0 auto; background-color: var(--background-color); min-height: 100vh; position: relative; padding-bottom: 70px; overflow-x: hidden; }
.screen { width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: var(--background-color); transition: transform 0.3s ease-in-out; }
.loading-screen { display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 1.5rem; color: var(--secondary-color); }
.login-screen { display: flex; flex-direction: column; justify-content: center; padding: 2rem; height: calc(100vh - 4rem); }
.login-screen h2 { color: var(--secondary-color); text-align: center; }
.login-screen input { width: 95%; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid #555; background-color: #333; color: white; font-size: 1rem; }
.login-screen button { width: 100%; padding: 1rem; border-radius: 8px; border: none; background: linear-gradient(90deg, var(--primary-color), var(--secondary-color)); color: #121212; font-size: 1.1rem; font-weight: 600; cursor: pointer; margin-top: 1rem; }
.toggle-form { text-align: center; margin-top: 1rem; color: #aaa; cursor: pointer; }
header { background: #1e1e1e; color: white; padding: 1rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; }
.logo { display: flex; align-items: center; gap: 0.5rem; }
.logo img { border-radius: 50%; }
.logo h1 { font-size: 1.5rem; margin: 0; color: var(--secondary-color); }
.user-info { display: flex; align-items: center; gap: 0.5rem; background-color: #333; padding: 0.5rem 1rem; border-radius: 20px; }
.game-lobby { padding: 1rem; }
.game-card { background: var(--card-bg); border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; box-shadow: var(--shadow); text-align: center; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; border: 1px solid #333; }
.game-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); border-color: var(--secondary-color); }
.game-card i { font-size: 2.5rem; color: var(--secondary-color); }
.game-card.disabled { opacity: 0.5; cursor: not-allowed; }
.game-screen { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.8); backdrop-filter: blur(5px); transform: translateX(100%); transition: transform 0.3s ease-in-out; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; padding: 2rem; z-index: 1000; }
.game-screen.visible { transform: translateX(0); }
.close-btn { position: absolute; top: 20px; right: 20px; font-size: 2rem; background: none; border: none; color: white; cursor: pointer; }
.timer-bar { width: 100%; background-color: rgba(255,255,255,0.3); border-radius: 10px; height: 10px; margin-bottom: 0.5rem; }
.timer-progress { width: 100%; height: 100%; background: linear-gradient(90deg, #11e28b, #00c2ff); border-radius: 10px; }
#timer-text { font-size: 1.5rem; font-weight: 600; }
.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; max-width: 400px; margin: 0 auto; display: flex; justify-content: space-around; background-color: var(--card-bg); box-shadow: 0 -2px 10px rgba(0,0,0,0.1); padding: 0.5rem 0; border-top: 1px solid #333; }
.nav-item { display: flex; flex-direction: column; align-items: center; text-decoration: none; color: #aaa; }
.nav-item.active { color: var(--secondary-color); }
.nav-item i { font-size: 1.5rem; }
.nav-item span { font-size: 0.7rem; }
.credits { font-size: 0.7rem; color: #555; text-align: center; padding: 2rem 1rem 1rem 1rem; opacity: 0.8; }```

---

#### **फाइल नंबर 3: `script.js`**
(यह आपके ऐप का दिमाग़ है।)

**कैसे बनाएँ:**
1.  GitHub में एक बार फिर से **"Add file" -> "Create new file"** पर क्लिक करें।
2.  फाइल का नाम रखें **`script.js`**.
3.  नीचे दिया गया कोड पेस्ट करें और **"Commit new file"** पर क्लिक करें।

```javascript
const firebaseConfig = { apiKey: "AIzaSyA_C5-1k40B2an8h3nTFkRflO4d4ZS6JWQ", authDomain: "mahadivya-panchang.firebaseapp.com", projectId: "mahadivya-panchang", storageBucket: "mahadivya-panchang.appspot.com", messagingSenderId: "336726728626", appId: "1:336726728626:web:9d165e3b429fe1b529ceab" };
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const appContainer = document.getElementById('app-container');
const BACKEND_URL = 'https://prinswin.onrender.com';

const renderLoginScreen = () => {
    appContainer.innerHTML = `
        <div class="login-screen">
            <h2 id="form-title">लॉगिन करें</h2>
            <input type="email" id="email-input" placeholder="ईमेल डालें" required>
            <input type="password" id="password-input" placeholder="पासवर्ड" required>
            <input type="password" id="confirm-password-input" placeholder="पासवर्ड कन्फर्म करें" style="display: none;">
            <button id="submit-btn">लॉगिन</button>
            <p id="toggle-form-btn" class="toggle-form">नया अकाउंट है? रजिस्टर करें</p>
        </div>
    `;
    attachLoginListeners();
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
            <div class="timer-bar"><div class="timer-progress"></div></div>
            <p id="timer-text">सर्वर से कनेक्ट हो रहा है...</p>
        </div>
    `;
    
    document.getElementById('logout-btn').addEventListener('click', () => auth.signOut());
    
    document.getElementById('color-quiz-game').addEventListener('click', () => {
        document.querySelector('.game-screen').classList.add('visible');
    });

    document.getElementById('close-game-btn').addEventListener('click', () => {
         document.querySelector('.game-screen').classList.remove('visible');
    });

    setInterval(async () => {
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

const attachLoginListeners = () => { /* यह पहले जैसा ही रहेगा */ };

auth.onAuthStateChanged(user => {
    appContainer.innerHTML = `<div class="loading-screen">लोड हो रहा है...</div>`;
    setTimeout(() => { // एक छोटा सा डिले ताकि सब कुछ स्मूथ लगे
        if (user) {
            renderHomeScreen(user);
        } else {
            renderLoginScreen();
        }
    }, 500);
});
