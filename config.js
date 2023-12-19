import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore"
import 'firebase/compat/storage';
import 'firebase/firestore';

// app firebase configration 

const firebaseConfig = {
    apiKey: "AIzaSyAue8DoYIkpivLfrQMqPZXjdxMTpLd7uYg",
    authDomain: "my-lost-and-found-5c11c.firebaseapp.com",
    projectId: "my-lost-and-found-5c11c",
    storageBucket: "my-lost-and-found-5c11c.appspot.com",
    messagingSenderId: "9650686096",
    appId: "1:9650686096:web:a7bd656eb6d5df8a517015",
    measurementId: "G-NKVYC2D1VH"

}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }

