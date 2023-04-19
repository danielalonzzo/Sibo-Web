import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
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
const Usuarios = collection(db, "Usuarios");

let nombre = document.querySelector("#firstName");
let apellidos = document.querySelector("#lastName");
let edad = document.querySelector("#age");
let sexo = document.querySelector("#gender");
let email = document.querySelector("#email");
let submit = document.querySelector("#submit-button");
const usuariosTabla = document.querySelector(".user-list");

submit.addEventListener('click',  async (e) => {
    e.preventDefault();
  
    try {
      const docRef = await addDoc(Usuarios, {
        firstName: nombre.value,
        lastName: apellidos.value,
        age: edad.value,
        gender: sexo.value,
        email: email.value,
      });
  
      console.log('Document written with ID: ', docRef.id);
      alert('¡Datos enviados correctamente!');
      
      nombre.value = '';
      apellidos.value = '';
      edad.value = '';
      sexo.value = '';
      email.value = '';
  
    } catch (error) {
      console.error('Error al agregar el documento :( : ', error);
      alert('Ocurrió un error al enviar el formulario. Por favor intenta nuevamente más tarde.');
    }

  
    mostrarUsuarios();
  });

  function renderUsuarios(usuarios) {
    usuariosTabla.innerHTML = "";
    usuarios.forEach((usuarios) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${usuarios.firstName}</td>
        <td>${usuarios.lastName}</td>
        <td>${usuarios.age}</td>
        <td>${usuarios.gender}</td>
        <td>${usuarios.email}</td>
        <td>
          <button class="btn btn-warning btn-sm edit" data-id="${usuarios.id}">Editar</button>
          <button class="btn btn-danger btn-sm delete" data-id="${usuarios.id}">Eliminar</button>
        </td>
      `;
      usuariosTabla.appendChild(tr);
    });
  }

  //Funcion para mostrar a los estudiantes
async function mostrarUsuarios() {
    const querySnapshot = await getDocs(collection(db, "Usuarios"));
    const usuarios = [];
    querySnapshot.forEach((doc) => {
      usuarios.push({ id: doc.id, ...doc.data() });
    });
    renderUsuarios(usuarios);
  }
  mostrarUsuarios();
  
  
  async function eliminarUsuarios(id) {
    try {
      await deleteDoc(doc(db, "Usuarios", id));
      console.log("Usuario eliminado con éxito");
      alert('¡Usuario eliminado correctamente!');
      mostrarUsuarios();
    } catch (error) {
      console.error("Error al eliminar el estudiante", error);
      alert('Ocurrió un error al eliminar el estudiante. Por favor intenta nuevamente más tarde.');
    }
  }
  
  usuariosTabla.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete')) {
      const usuarioId = e.target.dataset.id;
      if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        eliminarUsuarios(usuarioId);
      }
    }
  });

//Funcion editar estudiante
usuariosTabla.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit')) {
      const usuarioId = e.target.dataset.id;
      const docRef = doc(db, "Usuarios", usuarioId);
      const docData = await getDoc(docRef);
      const usuario = docData.data();
      
      // Cargar datos del estudiante en campos de entrada
      nombre.value = usuario.firstName;
      apellidos.value = usuario.lastName;
      edad.value = usuario.age;
      sexo.value = usuario.gender;
      email.value = usuario.email;
  
       // Agregar botón "Guardar"
       const guardarBtn = document.createElement('button');
       guardarBtn.classList.add('btn', 'btn-primary');
       guardarBtn.innerHTML = 'Guardar';
       guardarBtn.addEventListener('click', async () => {
         try {
           await updateDoc(docRef, {
             firstName: nombre.value,
             lastName: apellidos.value,
             age: edad.value,
             gender: sexo.value,
             direction: email.value,
           });
           console.log('Estudiante actualizado con éxito');
           alert('¡Estudiante actualizado correctamente!');
           mostrarUsuarios();
   
           // Remover botón "Guardar" y limpiar campos de entrada
           guardarBtn.remove();
           nombre.value = '';
           apellidos.value = '';
           edad.value = '';
           sexo.value = '';
           email.value = '';
         } catch (error) {
           console.error('Error al actualizar el estudiante', error);
           alert('Ocurrió un error al actualizar el estudiante. Por favor intenta nuevamente más tarde.');
         }
       });
   
       // Reemplazar botón "Editar" con botón "Guardar"
       e.target.parentNode.replaceChild(guardarBtn, e.target);
     }
   });