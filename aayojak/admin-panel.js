import { auth, db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const adminEmail = "aayojaknow@gmail.com";
const toast = document.getElementById("toast");

onAuthStateChanged(auth, async (user) => {
  if (!user || user.email !== adminEmail) {
    showToast("Access Denied.");
    window.location.href = "index.html";
    return;
  }

  const querySnapshot = await getDocs(collection(db, "vendors"));
  let html = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    html += `
      <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
        <p><strong>${data.fullName}</strong> - ${data.serviceType} (${data.location})</p>
        <p>Phone: ${data.phone}</p>
        <p>Email: ${data.email}</p>
        ${data.photoUrl ? `<img src="${data.photoUrl}" style="max-width:150px;">` : ""}
      </div>
    `;
  });

  document.getElementById("vendorList").innerHTML = html;
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

function showToast(msg) {
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
