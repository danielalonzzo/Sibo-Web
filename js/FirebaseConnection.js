import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



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
const db = getFirestore(app);
db.settings({timestampsInSnapshots: true});


