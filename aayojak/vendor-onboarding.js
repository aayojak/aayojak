import { auth, db, storage } from "./firebase.js";
import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const form = document.getElementById("vendorForm");
const toast = document.getElementById("toast");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return;

  let photoUrl = "";

  const file = document.getElementById("portfolioImage").files[0];
  if (file) {
    const fileRef = ref(storage, `vendors/${user.uid}/${file.name}`);
    await uploadBytes(fileRef, file);
    photoUrl = await getDownloadURL(fileRef);
  }

  const data = {
    uid: user.uid,
    fullName: document.getElementById("fullName").value,
    businessName: document.getElementById("businessName").value,
    serviceType: document.getElementById("serviceType").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
    paymentModes: document.getElementById("paymentModes").value,
    availability: document.getElementById("availability").value,
    photoUrl: photoUrl,
    phone: user.phoneNumber || "",
    email: user.email || "",
    profileComplete: true,
    createdAt: new Date()
  };

  try {
    await setDoc(doc(db, "vendors", user.uid), data);
    showToast("Profile saved!");
    window.location.href = "vendor-dashboard.html";
  } catch (err) {
    showToast("Error saving profile: " + err.message);
  }
});

function showToast(msg) {
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
