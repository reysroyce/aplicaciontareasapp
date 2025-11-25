// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCV-ty_cjljVwVmKxbNWKRLgk--92DEMuw",
  authDomain: "tareas-f0aac.firebaseapp.com",
  projectId: "tareas-f0aac",
  storageBucket: "tareas-f0aac.appspot.com",
  messagingSenderId: "724287254480",
  appId: "1:724287254480:web:afd1d691a4056e11b5d3d5",
  measurementId: "G-VREW5NQ24R"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Habilitar modo offline
db.enablePersistence()
  .catch((err) => console.log("Offline error:", err));

// LOGIN
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

// GUARDAR TAREA
function guardarTarea() {
  const tarea = document.getElementById("tarea").value;

  db.collection("tareas").add({
    texto: tarea,
    fecha: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("tarea").value = "";
}

// LEER TAREAS
function cargarTareas() {
  db.collection("tareas").onSnapshot(snapshot => {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    snapshot.forEach(doc => {
      lista.innerHTML += `<li>${doc.data().texto}</li>`;
    });
  });
}
