const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} catch (error) { console.error("Firebase चाबी में त्रुटि:", error); }

let gameTimer = 180;
setInterval(() => { gameTimer = (gameTimer > 0) ? gameTimer - 1 : 180; }, 1000);

app.get('/game-state', (req, res) => res.json({ timer: gameTimer }));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`सर्वर पोर्ट ${PORT} पर चल रहा है`));
