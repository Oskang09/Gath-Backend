const FirebaseAdmin      = require('firebase-admin');
const FirebaseCredential = require('../config/firebase');

FirebaseAdmin.initializeApp({ credential: FirebaseAdmin.credential.cert(FirebaseCredential) });
const bucket = FirebaseAdmin.storage().bucket('gs://gathfyp2019.appspot.com');
const auth = FirebaseAdmin.auth();

module.exports = { bucket, auth };