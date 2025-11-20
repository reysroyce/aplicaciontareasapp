// Configura tu proyecto Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  projectId: "TU_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Habilitar modo offline
db.enablePersistence();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("login").style.display = "none";
      document.getElementById("app").style.display = "block";
      cargarTareas();
    })
    .catch(error => alert("Error: " + error.message));
}

function guardarTarea() {
  const tarea = document.getElementById("tarea").value;

  db.collection("tareas").add({
    texto: tarea,
    fecha: new Date()
  });

  document.getElementById("tarea").value = "";
}

function cargarTareas() {
  db.collection("tareas").onSnapshot(snapshot => {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    snapshot.forEach(doc => {
      lista.innerHTML += `<li>${doc.data().texto}</li>`;
    });
  });
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
