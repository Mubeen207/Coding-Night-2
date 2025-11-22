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
function forgotPassword() {
  message = document.getElementById("message");
  let email = emailEl.value;
  if (email === "") {
    message.innerHTML = "Please enter your email address first.";
    message.classList.add("show", "message-error");
    return;
  }
  message.innerHTML = "";
  message.classList.remove("show", "message-error", "message-success");
  fb.sendPasswordResetEmail(email)
    .then(() => {
      message.innerHTML = "Password reset email sent! Please check your inbox.";
      message.classList.add("show", "message-success");
    })
    .catch((error) => {
      message.innerHTML = errorMessage(error.code);
      message.classList.add("show", "message-error");
    });
}