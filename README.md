# 📱 User Management App (React Native)

A modern **React Native mobile application** for managing users with authentication, API integration, pagination, and offline support.

---

## ✨ Features

* 🔐 Login Screen with validation
* 📋 User List with **pagination (API-based)**
* 👤 User Detail Screen
* ➕ Add / ✏️ Edit User
* 🧠 State Management using **Redux Toolkit**
* 🧭 Navigation using **React Navigation**
* ⚠️ Error handling & loading states

### ⭐ Bonus Features

* 🖼️ Image Upload
* 📡 Offline Caching (Local Storage fallback)

---

## 🛠️ Tech Stack

* React Native (CLI)
* TypeScript
* Redux Toolkit
* React Navigation
* React Hook Form
* Axios

---

## 📂 Project Structure

![Folder Structure](https://github.com/user-attachments/assets/034a6a47-eb47-4904-97ff-648c81a2e056)

---

## 📸 App Screens

![User Management](https://github.com/user-attachments/assets/dea1ac81-90c6-4010-a112-fd30e74a6b6b)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/riyasolanki/userManagement.git
cd userManagement
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Application

#### ▶️ Android

```bash
npx react-native run-android
```

#### 🍎 iOS

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

---

## 🔑 Test Credentials

```txt
Email: emily.johnson@x.dummyjson.com
Password: emilyspass
```

---

## 📡 API Integration

* Base API: https://dummyjson.com/users
* Pagination implemented using:

  * `limit`
  * `skip`

---

## 📦 Build APK

```bash
cd android
./gradlew assembleRelease
```

📍 Output path:

```
android/app/build/outputs/apk/release/app-release.apk
```

---

## ⚠️ Error Handling

* API failure handled with alerts
* Form validation using React Hook Form
* Input validation with proper error UI

---

## 📡 Offline Support

* Users cached locally
* App works without internet (fallback mechanism)

---

## 🚀 Key Highlights

* Clean architecture & reusable components
* Scalable folder structure
* Production-ready form handling
* Smooth UX with validation & loaders

---

## 👩‍💻 Author

**Riya Solanki**
🔗 GitHub: https://github.com/riyasolanki

---

## 📌 Notes

This project is built as part of a **technical assessment** and demonstrates:

* Real-world app structure
* API handling with pagination
* Form validation & state management
