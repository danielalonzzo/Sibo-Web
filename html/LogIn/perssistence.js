import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

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
let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log(`Usuario actual: ${currentUser.email}`);
  } else {
    currentUser = null;
    console.log("No hay usuario autenticado.");
  }
});

const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // El usuario se ha deslogueado correctamente
      console.log("Usuario deslogueado.");
      window.location.replace("../LogIn/InterfazPrincipalLogIn.html"); // Redirigir a la página de inicio de sesión
      console.log(`Usuario actual: ${currentUser.email}`);
    })
    .catch((error) => {
      // Manejar errores de deslogueo
      console.log(error.message);
    });
});
