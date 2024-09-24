const admin = require("firebase-admin");

const serviceAccount = require("./path/to/your/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "job-ready-353b6.appspot.com", // replace with your bucket name
});

const bucket = admin.storage().bucket();

module.exports = bucket;
