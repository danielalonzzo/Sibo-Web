import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
  } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBV__UglW83VhQT8Af36IoU_DDUpvmj_tM",
  authDomain: "sibo-9b98c.firebaseapp.com",
  databaseURL: "https://sibo-9b98c-default-rtdb.firebaseio.com",
  projectId: "sibo-9b98c",
  storageBucket: "sibo-9b98c.appspot.com",
  messagingSenderId: "990857675283",
  appId: "1:990857675283:web:6921436a5f5c8a7180b5e6",
  measurementId: "G-TWY82K4MSL"

};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productos = collection(db, "Productos");


const btnGuardar = document.querySelector('#btnGuardar');

btnGuardar.addEventListener('click',  async (e) =>{
  // obtiene los valores de los campos del formulario
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const anno = document.getElementById('año').value;
  const tipo = document.getElementById('tipo').value;
 
  try {
    const docRef = await addDoc(productos, {
      nombre: nombre,
      precio: precio,
      anno: anno,
      tipo: tipo
    });

    console.log('Document written with ID: ', docRef.id);
    alert('¡Datos enviados correctamente!');

  } catch (error) {
    console.error('Error al agregar el documento :( : ', error);
    alert('Ocurrió un error al enviar el formulario. Por favor intenta nuevamente más tarde.');
  }
})


