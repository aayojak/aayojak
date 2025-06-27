# Aayojak Vendor Platform

✅ Firebase real-time app for vendors:
- Phone OTP login
- Vendor onboarding with image upload
- Vendor dashboard
- Admin panel
- Firestore + Storage

## Setup

1. Clone this repo
2. Run on Netlify or any static host
3. Configure Firebase:
   - Auth → enable Phone Auth
   - Firestore → enable (start in test mode)
   - Storage → enable for image uploads

## Files

- `index.html` - public homepage
- `login.html` - OTP login
- `vendor-onboarding.html` - onboarding form
- `vendor-dashboard.html` - vendor private page
- `admin-panel.html` - admin only
- `firebase.js` - Firebase config and SDK imports
- `style.css` - styling
- JS files handling all logic

## Deployment

- Push repo to GitHub
- Connect repo to Netlify
- That’s it!

## Admin Email

Only this email has access to the admin panel:
```
aayojaknow@gmail.com
```

---

## How it Works

✅ Vendors sign up via phone OTP

✅ Vendors complete onboarding:
- Name
- Business Name
- Service Type
- City/State
- Description
- Payment Modes
- Availability
- Optional Portfolio Image

✅ Data saved to Firestore

✅ Vendor Dashboard:
- Loads vendor profile
- Displays uploaded photo
- Allows logout

✅ Admin Panel:
- Lists all vendors
- Displays vendor details + photos
- Protected by admin email check

---

Happy event organizing with Aayojak!
