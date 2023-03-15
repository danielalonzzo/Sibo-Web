// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBV__UglW83VhQT8Af36IoU_DDUpvmj_tM",

  authDomain: "sibo-9b98c.firebaseapp.com",

  projectId: "sibo-9b98c",

  storageBucket: "sibo-9b98c.appspot.com",

  messagingSenderId: "990857675283",

  appId: "1:990857675283:web:6921436a5f5c8a7180b5e6",

  measurementId: "G-TWY82K4MSL"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
