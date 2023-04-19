import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBV__UglW83VhQT8Af36IoU_DDUpvmj_tM",

  authDomain: "sibo-9b98c.firebaseapp.com",

  databaseURL: "https://sibo-9b98c-default-rtdb.firebaseio.com",

  projectId: "sibo-9b98c",

  storageBucket: "sibo-9b98c.appspot.com",

  messagingSenderId: "990857675283",

  appId: "1:990857675283:web:6921436a5f5c8a7180b5e6",

  measurementId: "G-TWY82K4MSL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const Usuarios = collection(db, "Usuarios");

const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstName= document.getElementById("username").value;
  const edad = document.getElementById("edad").value;
  const gender = document.getElementById("sexo").value;
  const lastName = document.getElementById("apellidos").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // El usuario se registró exitosamente
    const user = userCredential.user;
    console.log("Usuario registrado:", user);
    form.reset();

    const docRef = await addDoc(Usuarios, {
      firstName: firstName,
      lastName: lastName,
      age: edad,
      gender: gender,
      email: email,
    });

    const { id } = await docRef;
    console.log("Document written with ID: ", id);
    alert("¡Datos enviados correctamente!");
    
  } catch (error) {
    // Hubo un error al registrar al usuario o al agregar el documento
    console.error("Error al registrar al usuario o al agregar el documento:", error);
    alert("Ocurrió un error al enviar el formulario. Por favor intenta nuevamente más tarde.");
  }
});
