const firebaseConfig = {
  apiKey: "AIzaSyAjIuUGiXBKBCjy9dTPmRKoKsYk64jQ7gI",
  authDomain: "coding-night-2.firebaseapp.com",
  projectId: "coding-night-2",
  storageBucket: "coding-night-2.firebasestorage.app",
  messagingSenderId: "302080672332",
  appId: "1:302080672332:web:be03a1e086cf2ee14ceae9",
  measurementId: "G-6L00B6RPDQ",
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let fb = firebase.auth();
let emailEl = document.getElementById("email");
let passwordEl = document.getElementById("password");

function signIn() {
  fb.signInWithEmailAndPassword(emailEl.value, passwordEl.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      localStorage.setItem("uid", user.uid)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(error);
    });
}