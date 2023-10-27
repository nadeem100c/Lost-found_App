import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore"

// app firebase configration 

const firebaseConfig = {
    apiKey: "AIzaSyD9PYCApCLnpV5o3YoVq3lI3ApmOIEmhow",
    authDomain: "lostandfound-9b8c9.firebaseapp.com",
    projectId: "lostandfound-9b8c9",
    storageBucket: "lostandfound-9b8c9.appspot.com",
    messagingSenderId: "773323682904",
    appId: "1:773323682904:web:5513df9714ffdc0e9c862d",
    measurementId: "G-L2C1159NC1"
}

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}