const firebaseConfig = { apiKey: "AIzaSyA_C5-1k40B2an8h3nTFkRflO4d4ZS6JWQ", authDomain: "mahadivya-panchang.firebaseapp.com", projectId: "mahadivya-panchang", storageBucket: "mahadivya-panchang.appspot.com", messagingSenderId: "336726728626", appId: "1:336726728626:web:9d165e3b429fe1b529ceab" };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const appContainer = document.getElementById('app-container');
let BACKEND_URL = ''; // यह URL Render.com से मिलेगा
const renderLoginScreen = () => {
appContainer.innerHTML = <div class="login-screen"> <h2>लॉगिन करें</h2> <input type="email" id="email-input" placeholder="ईमेल"> <input type="password" id="password-input" placeholder="पासवर्ड"> <button id="login-btn">लॉगिन</button> </div>;
document.getElementById('login-btn').addEventListener('click', () => {
const email = document.getElementById('email-input').value;
const password = document.getElementById('password-input').value;
auth.signInWithEmailAndPassword(email, password).catch(err => alert(err.message));
});
};
const renderHomeScreen = (user) => {
appContainer.innerHTML = <header class="main-header"> <div class="logo"><h1>PrinsWin</h1></div> <div class="user-info"><i class="fas fa-wallet"></i><span id="wallet-balance">₹0.00</span></div> </header> <main class="game-lobby"> <h2>गेम चुनें</h2> <div class="game-card" id="color-quiz-game"><i class="fas fa-palette"></i><h3>कलर क्विज़</h3></div> </main> <div class="game-screen"> <button id="close-game-btn" class="close-btn">&times;</button> <h2>कलर क्विज़ टूर्नामेंट</h2> <p id="timer-text">कनेक्ट हो रहा है...</p> </div> <footer class="bottom-nav"> <a href="#" class="nav-item active"><i class="fas fa-home"></i><span>होम</span></a> <a href="#" class="nav-item" id="logout-btn"><i class="fas fa-sign-out-alt"></i><span>लॉगआउट</span></a> </footer>;
