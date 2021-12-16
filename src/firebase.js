import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCoZh6LFYe59RrMtlRW5K0xpeVgfvq7ejw",
    authDomain: "doctor-5d082.firebaseapp.com",
    projectId: "doctor-5d082",
    storageBucket: "doctor-5d082.appspot.com",
    messagingSenderId: "207364024682",
    appId: "1:207364024682:web:bafa6d0405c8ff28b11d13",
    measurementId: "G-HM38S1L9BV"
};

firebase.initializeApp(firebaseConfig)

export default firebase