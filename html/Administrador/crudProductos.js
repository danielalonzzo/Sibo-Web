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
const productos = collection(db, "Productos");
const storage = getStorage(app);
const productosTabla = document.querySelector(".product-list")
const btnGuardar = document.querySelector("#btnGuardar");

btnGuardar.addEventListener("click", async (e) => {
  e.preventDefault();

  // obtiene los valores de los campos del formulario
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const anno = document.getElementById("anno").value;
  const tipo = document.getElementById("tipo").value;
  const marca = document.getElementById("marca").value;
  const imagen = document.getElementById("imagen").files[0];
  const form = document.querySelector("form");
  

  const storageRef = ref(storage, 'Productos/' + imagen.name);

  try {
    // carga el archivo de imagen en Firebase Storage
    const snapshot = await uploadBytes(storageRef, imagen);

    // obtiene la URL de descarga del archivo de imagen
    const downloadURL = await getDownloadURL(storageRef);

    // agrega los datos del formulario a Firestore, incluyendo la URL de descarga de la imagen
    const docRef = await addDoc(productos, {
      nombre: nombre,
      precio: precio,
      anno: anno,
      marca: marca,
      tipo: tipo,
      imagenURL: downloadURL
    });

    console.log('Document written with ID: ', docRef.id);
    alert('¡Datos enviados correctamente!');
    form.reset()

  } catch (error) {
    console.error('Error al agregar el documento :( : ', error);
    alert('Ocurrió un error al enviar el formulario. Por favor intenta nuevamente más tarde.');
  }
});

function renderProductos(listaProductos) {
  productosTabla.innerHTML = "";
  listaProductos.forEach((productos) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${productos.nombre}</td>
      <td>${productos.precio}</td>
      <td>${productos.anno}</td>
      <td>${productos.marca}</td>
      <td>${productos.tipo}</td>
      <td>
        <button class="btn btn-warning btn-sm edit" data-id="${productos.id}">Editar</button>
        <button class="btn btn-danger btn-sm delete" data-id="${productos.id}">Eliminar</button>
      </td>
    `;
    productosTabla.appendChild(tr);
  });
}

async function mostrarProductos() {
  const querySnapshot = await getDocs(collection(db, "Productos"));
  const productos = [];
  querySnapshot.forEach((doc) => {
    productos.push({ id: doc.id, ...doc.data() });
  });
  renderProductos(productos);
}
mostrarProductos();


async function eliminarProductos(id) {
  try {
    await deleteDoc(doc(db, "Productos", id));
    console.log("Producto eliminado con éxito");
    alert('¡Producto eliminado correctamente!');
    mostrarProductos();
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    alert('Ocurrió un error al eliminar el producto. Por favor intenta nuevamente más tarde.');
  }
}

productosTabla.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete')) {
    const productoId = e.target.dataset.id;
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      eliminarProductos(productoId);
    }
  }
});

productosTabla.addEventListener('click', async (e) => {
  if (e.target.classList.contains('edit')) {
    const productosId = e.target.dataset.id;
    const docRef = doc(db, "Productos", productosId);
    const docData = await getDoc(docRef);
    const producto = docData.data();
    
    // Cargar datos del estudiante en campos de entrada
    nombre.value = producto.nombre;
    precio.value = producto.precio;
    anno.value = producto.anno;
    marca.value = producto.marca;
    tipo.value = producto.tipo;
    
     // Agregar botón "Guardar"
     const guardarBtn = document.createElement('button');
     guardarBtn.classList.add('btn', 'btn-primary');
     guardarBtn.innerHTML = 'Guardar';
     guardarBtn.addEventListener('click', async () => {
       try {
         await updateDoc(docRef, {
           nombre: nombre.value,
           precio: precio.value,
           anno: anno.value,
           marca: marca.value,
           tipo: tipo.value,
         });
         console.log('Producto actualizado con éxito');
         alert('¡Producto actualizado correctamente!');
         mostrarProductos();
 
         // Remover botón "Guardar" y limpiar campos de entrada
         guardarBtn.remove();
         nombre.value = '';
         precio.value = '';
         anno.value = '';
         marca.value = '';
         tipo.value = '';
       } catch (error) {
         console.error('Error al actualizar el producto', error);
         alert('Ocurrió un error al actualizar el producto. Por favor intenta nuevamente más tarde.');
       }
     });
 
     // Reemplazar botón "Editar" con botón "Guardar"
     e.target.parentNode.replaceChild(guardarBtn, e.target);
   }
  });

