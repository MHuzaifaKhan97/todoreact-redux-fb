import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD1v7BtfjynQTbAPCTAumRV8b5ASp2sR4s",
    authDomain: "react-todo-crud.firebaseapp.com",
    databaseURL: "https://react-todo-crud.firebaseio.com",
    projectId: "react-todo-crud",
    storageBucket: "react-todo-crud.appspot.com",
    messagingSenderId: "491813254587",
    appId: "1:491813254587:web:cd48008f0f4c6a7ef5809e",
    measurementId: "G-DZ8ZVC1Z6K"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);

let db = firebaseApp.database();
export default db;
