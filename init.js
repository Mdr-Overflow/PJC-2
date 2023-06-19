import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const start = document.getElementById("start");
const opt = document.getElementById("opt");
const popup = document.getElementById("popup");
const load = document.getElementById("load");
const closeBtn = document.querySelector(".close");
const popupText = document.getElementsByClassName("popup-content");

const firebaseConfig = {
  apiKey: "AIzaSyBycLnWlKUZFvkzLaRmHFOkAYhy_2vs7FE",
  authDomain: "pjc-game.firebaseapp.com",
  projectId: "pjc-game",
  storageBucket: "pjc-game.appspot.com",
  messagingSenderId: "517358644583",
  appId: "1:517358644583:web:0fe8823bc68a64b0ef13c2",
  measurementId: "G-EZLQ0664PF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, function (user) {
  if (user) {
    const child = document.createElement("h4");
    child.innerHTML = `Your name is ${user.displayName} and your email is ${user.email}`;
    popupText[0].appendChild(child);
  } else {
    alert("Not log in");
  }
});

let isOpen = false;

start.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "index.html"; // 
});

opt.addEventListener("click", (e) => {
  e.preventDefault();
  togglePopup();
});

opt.addEventListener("keydown", (e) => {
  e.preventDefault();

  if (e.key === "Escape") togglePopup();
});

closeBtn.addEventListener("click", () => {
  togglePopup();
});

load.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html";  //
  });

function togglePopup() {
  isOpen = !isOpen;
  if (isOpen) {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
}