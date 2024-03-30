import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCEwP7pWW7wzkuiUmGU3T84NoipGRxncWE",
    authDomain: "agrifarm-28439.firebaseapp.com",
    databaseURL: "https://agrifarm-28439-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "agrifarm-28439",
    storageBucket: "agrifarm-28439.appspot.com",
    messagingSenderId: "387483679307",
    appId: "1:387483679307:web:edbe44bf6c5b4189f2ebce"
};

const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

export {app};
