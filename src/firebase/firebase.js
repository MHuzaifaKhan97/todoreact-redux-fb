import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
    measurementId: "measurementId"
};

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);

let db = firebaseApp.database();
export default db;
