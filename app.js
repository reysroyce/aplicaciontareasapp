// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCV-ty_cjljVwVmKxbNWKRLgk--92DEMuw",
  authDomain: "tareas-f0aac.firebaseapp.com",
  projectId: "tareas-f0aac",
  storageBucket: "tareas-f0aac.firebasestorage.app",
  messagingSenderId: "724287254480",
  appId: "1:724287254480:web:afd1d691a4056e11b5d3d5",
  measurementId: "G-VREW5NQ24R"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Elementos HTML
const loginDiv = document.getElementById("login");
const appDiv = document.getElementById("app");
const lista = document.getElementById("lista");

// Función de login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      loginDiv.style.display = "none";
      appDiv.style.display = "block";
      cargarTareas();
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Guardar tarea
function guardarTarea() {
  const tarea = document.getElementById("tarea").value;
  const user = auth.currentUser;

  if (!user) {
    alert("Debes iniciar sesión");
    return;
  }

  db.collection("tareas").add({
    texto: tarea,
    uid: user.uid,
    fecha: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("tarea").value = "";
}

// Cargar tareas
function cargarTareas() {
  const user = auth.currentUser;

  db.collection("tareas")
    .where("uid", "==", user.uid)
    .onSnapshot((snapshot) => {

      lista.innerHTML = "";

      snapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.textContent = doc.data().texto;
        lista.appendChild(li);
      });
    });
}
