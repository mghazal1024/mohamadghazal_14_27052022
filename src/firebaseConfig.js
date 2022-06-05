import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBkKj5pPWhNRn1UOuwGW3iVt7lwMX9UEA",
    authDomain: "hrnet-14.firebaseapp.com",
    databaseURL: "https://hrnet-14-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hrnet-14",
    storageBucket: "hrnet-14.appspot.com",
    messagingSenderId: "1088716597100",
    appId: "1:1088716597100:web:096d2ce7c4f194cd333549"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db ;