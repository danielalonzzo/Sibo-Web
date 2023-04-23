import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

import {} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

const usuariosRef = collection(db, "Usuarios");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const email = user.email;
    console.log("Email:", email);

    getDocs(usuariosRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const usuario = doc.data();
          if (usuario.email === email) {
            console.log("Usuario encontrado:", usuario);
            // actualizar campos de la página con datos del usuario
            document.getElementById("nombre").innerHTML = usuario.firstName;
            document.getElementById("apellidos").innerHTML = usuario.lastName;
            document.getElementById("correo").innerHTML = usuario.email;
            document.getElementById("genero").innerHTML = usuario.gender;
            document.getElementById("edad").innerHTML = usuario.age;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // usuario no autenticado
  }
});
