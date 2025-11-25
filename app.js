// 🔥 CONFIGURACIÓN FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCV-ty_cjljVwVmKxbNWKRLgk--92DEMuw",
  authDomain: "tareas-f0aac.firebaseapp.com",
  projectId: "tareas-f0aac",
  storageBucket: "tareas-f0aac.firebasestorage.app",
  messagingSenderId: "724287254480",
  appId: "1:724287254480:web:afd1d691a4056e11b5d3d5"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencias
const auth = firebase.auth();
const db = firebase.firestore();

// 🔐 LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("login").style.display = "none";
      document.getElementById("app").style.display = "block";
      cargarTareas();
    })
    .catch(error => {
      alert("❌ Error: " + error.message);
    });
}

// ✅ GUARDAR TAREA
function guardarTarea() {
  const texto = document.getElementById("tarea").value;

  if(texto.trim() === "") return alert("Escribe algo");

  db.collection("tareas").add({
    texto: texto,
    fecha: new Date()
  }).then(() => {
    document.getElementById("tarea").value = "";
  })
  .catch(error => alert("Error guardando: " + error.message));
}

// 📥 CARGAR TAREAS
function cargarTareas() {
  db.collection("tareas")
    .orderBy("fecha", "desc")
    .onSnapshot(snapshot => {
      const lista = document.getElementById("lista");
      lista.innerHTML = "";

      snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().texto;
        lista.appendChild(li);
      });
    });
}
