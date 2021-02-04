import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
   apiKey: "AIzaSyCQ2TUd23Ca2xAuukXSsXHTFEzI9z6r-TQ",
   authDomain: "rn-test-solomon-markets.firebaseapp.com",
   projectId: "rn-test-solomon-markets",
   storageBucket: "rn-test-solomon-markets.appspot.com",
   messagingSenderId: "886876369392",
   appId: "1:886876369392:web:0d7302fa910015ee63ed35",
}

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

export default Firebase
