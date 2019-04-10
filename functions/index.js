const functions = require('firebase-functions');
// Requerimos Firebase Admin
const firebase = require('firebase-admin');
// Creamos un archivo con nuestra configuración.
const config = require('./firebase-config.json');

// inicializamos nuestra aplicacion
firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: 'https://arepa-dev-api.firebaseio.com'
});

// creaamos la funcion que obtiene los recursos de nuestra firebase database
exports.api = functions.https.onRequest((req, res) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'GET') {
    const data = firebase.database().ref('/me')
    data.on('value', (snapshot) => {
      res.json(snapshot.val());
    });
  }
});