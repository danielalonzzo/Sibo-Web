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
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";

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
const db = getFirestore(app);
const productosRef = collection(db, 'Productos');


const q = query(productosRef, where('marca', '==', 'Apple'));

const listaProductos = document.querySelector(".listaProductos");



console.log('Obteniendo productos de la marca "apple"...');
getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const producto = doc.data();
      const article = document.createElement("article");
      const imagen = document.createElement("img");
      imagen.src = producto.imagenURL; // asumiendo que la imagen está en la base de datos
      imagen.alt = producto.nombre;
      const h2 = document.createElement("h2");
      h2.textContent = producto.nombre;
      const p2 = document.createElement("p");
      p2.textContent = `Precio: ₡${producto.precio}`;
      const boton = document.createElement("button");
      boton.textContent = "Agregar al carrito";
      article.appendChild(imagen);
      article.appendChild(h2);
      article.appendChild(p2);
      article.appendChild(boton);
      listaProductos.appendChild(article);
    });
  }).catch((error) => {
    console.error('Error al obtener los productos:', error);
  });