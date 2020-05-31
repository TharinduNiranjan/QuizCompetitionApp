import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCFPtR8KRSpFBSjXxLcKOmjh00Psmalg90",
    authDomain: "reactauthtest-13cc8.firebaseapp.com",
    databaseURL: "https://reactauthtest-13cc8.firebaseio.com",
    projectId: "reactauthtest-13cc8",
    storageBucket: "reactauthtest-13cc8.appspot.com",
    messagingSenderId: "879127747925",
    appId: "1:879127747925:web:5cb852c6f26cf93f3123dc",
    measurementId: "G-50TZD5275Z"
  };

  export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;