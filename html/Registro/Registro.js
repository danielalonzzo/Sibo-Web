import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBV__UglW83VhQT8Af36IoU_DDUpvmj_tM",
    authDomain: "sibo-9b98c.firebaseapp.com",
    projectId: "sibo-9b98c",
    storageBucket: "sibo-9b98c.appspot.com",
    messagingSenderId: "990857675283",
    appId: "1:990857675283:web:6921436a5f5c8a7180b5e6",
    measurementId: "G-TWY82K4MSL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // El usuario se registró exitosamente
      const user = userCredential.user;
      console.log("Usuario registrado:", user);
      form.reset();
    })
    .catch((error) => {
      // Hubo un error al registrar al usuario
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});