import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const toast = document.getElementById("toast");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const docSnap = await getDoc(doc(db, "vendors", user.uid));
  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("profile").innerHTML = `
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Business:</strong> ${data.businessName}</p>
      <p><strong>Service:</strong> ${data.serviceType}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Description:</strong> ${data.description}</p>
      <p><strong>Payments:</strong> ${data.paymentModes}</p>
      <p><strong>Availability:</strong> ${data.availability}</p>
      ${data.photoUrl ? `<img src="${data.photoUrl}" style="max-width:200px; margin-top:10px;">` : ""}
    `;
  } else {
    window.location.href = "vendor-onboarding.html";
  }
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
