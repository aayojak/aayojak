import { auth, db } from "./firebase.js";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  size: 'invisible'
});

const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const phoneInput = document.getElementById("phone");
const otpInput = document.getElementById("otp");
const toast = document.getElementById("toast");

let confirmationResult = null;

sendOtpBtn.addEventListener("click", async () => {
  const phone = phoneInput.value;
  try {
    confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
    showToast("OTP sent successfully!");
    otpInput.style.display = "block";
    verifyOtpBtn.style.display = "block";
  } catch (err) {
    showToast("Error sending OTP: " + err.message);
  }
});

verifyOtpBtn.addEventListener("click", async () => {
  const otp = otpInput.value;
  try {
    await confirmationResult.confirm(otp);
    showToast("Login successful!");
    checkVendorProfile();
  } catch (err) {
    showToast("Invalid OTP.");
  }
});

async function checkVendorProfile() {
  const user = auth.currentUser;
  if (!user) return;

  const docRef = doc(db, "vendors", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists() && docSnap.data().profileComplete) {
    window.location.href = "vendor-dashboard.html";
  } else {
    window.location.href = "vendor-onboarding.html";
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    checkVendorProfile();
  }
});

function showToast(msg) {
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
