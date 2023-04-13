import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

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

// Función que se ejecuta cuando se envía el formulario
function handleSubmit(event) {
  event.preventDefault();

  // Obtiene el correo electrónico ingresado por el usuario
  const email = document.querySelector("#email").value;

  // Envia el correo de recuperación de contraseña
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Correo de recuperación enviado");
      alert("Se ha enviado un correo de recuperación a su dirección de correo electrónico");
    })
    .catch((error) => {
      console.error(error);
      alert("Ha ocurrido un error al enviar el correo de recuperación");
    });
}

// Agrega un escucha al evento submit del formulario
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
