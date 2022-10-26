// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh3bxg83Q7c6ifJiuryQxxSG4f3tE6f7k",
  authDomain: "ta-work-e9dfc.firebaseapp.com",
  projectId: "ta-work-e9dfc",
  storageBucket: "ta-work-e9dfc.appspot.com",
  messagingSenderId: "228588520251",
  appId: "1:228588520251:web:b4ae894412e87a65c32d1e",
  measurementId: "G-ZFH7VGL2KT",
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const store = getFirestore(app);
const storage = getStorage(app);

export { app, store, storage };
// For reference: This is how you add
// try {
//   const docRef = await addDoc(collection(store, "user"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815,
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
