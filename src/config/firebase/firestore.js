//FIREBASE
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const admin = require("firebase-admin")
const serviceAccount = require("./key/serviceAccountKey.json")


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Conecte-se ao Firestore
const db = getFirestore();

module.exports = db;// Exporta a instância do Firestore