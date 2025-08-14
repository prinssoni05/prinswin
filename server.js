// server.js - PrinsWin का दिमाग़
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// Firebase की चाबी को Render.com से लोड करना
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {
  console.error("Firebase Admin SDK शुरू करने में त्रुटि:", error);
}

const db = admin.firestore();

// सर्वर चल रहा है या नहीं, यह जांचने के लिए
app.get('/', (req, res) => {
  res.send('PrinsWin Backend चल रहा है!');
});

// गेम की स्थिति और टाइमर का लॉजिक (अभी के लिए डेमो)
let gameTimer = 180;
let currentRoundId = 1;

setInterval(() => {
  if (gameTimer > 0) {
    gameTimer--;
  } else {
    // यहाँ पर नतीजा घोषित करने और प्राइज बांटने का लॉजिक आएगा
    console.log(`Round ${currentRoundId} खत्म हुआ।`);
    gameTimer = 180; // टाइमर रीसेट
    currentRoundId++;
  }
}, 1000);

// फ्रंटएंड को गेम की लाइव जानकारी देना
app.get('/game-state', (req, res) => {
  res.json({
    timer: gameTimer,
    roundId: currentRoundId
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`सर्वर पोर्ट ${PORT} पर चल रहा है`);
});
