import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBaSyS6fvYr6pYb3bdDoHKpsesHEhbMm3c",
    authDomain: "halochat-5852c.firebaseapp.com",
    projectId: "halochat-5852c",
    storageBucket: "halochat-5852c.appspot.com",
    messagingSenderId: "527552896709",
    appId: "1:527552896709:web:a6d7ee49fc1e188709daac",
    measurementId: "G-XE1NLFWHT7"
}).auth();

