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
const carrito = [];


async function mostrarProductos() {
  const productosRef = collection(db, "Productos");
  const productosQuery = query(productosRef, where("marca", "==", "Microsoft"), where("tipo", "==", "Computadora"));
  const productosSnapshot = await getDocs(productosQuery);
  
  productosSnapshot.forEach((productoDoc) => {
    const productoData = productoDoc.data();
    const contenedorItems = document.querySelector(".contenedor-items");

    const item = document.createElement("div");
    item.classList.add("item");

    const tituloItem = document.createElement("span");
    tituloItem.classList.add("titulo-item");
    tituloItem.textContent = productoData.nombre;

    const imgItem = document.createElement("img");
    imgItem.classList.add("img-item");
    imgItem.src = productoData.imagenURL;

    const precioItem = document.createElement("span");
    precioItem.classList.add("precio-item");
    precioItem.textContent = `₡${productoData.precio}`;

    const botonItem = document.createElement("button");
    botonItem.classList.add("boton-item");
    botonItem.textContent = "Agregar al Carrito";
    botonItem.addEventListener("click", function() {
      alert("Se agregó al carrito");
    });

    item.appendChild(tituloItem);
    item.appendChild(imgItem);
    item.appendChild(precioItem);
    item.appendChild(botonItem);

    contenedorItems.appendChild(item);
    
  });
}

mostrarProductos();


