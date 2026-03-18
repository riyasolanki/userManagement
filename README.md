This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# 📱 User Management App (React Native)

A React Native mobile application for managing users with authentication, API integration, and form handling.

---

## 🚀 Features

- 🔐 Login Screen with validation
- 📋 User List (with pagination)
- 👤 User Detail Screen
- ➕ Add / ✏️ Edit User
- 🧠 State Management using Redux Toolkit
- 🧭 React Navigation integration
- ⚠️ Error handling & loading states

### ⭐ Bonus Features
- 🖼️ Image Upload
- 📡 Offline Caching

---

## 🛠️ Tech Stack

- React Native
- TypeScript
- Redux Toolkit
- React Navigation
- React Hook Form
- Axios / Fetch API

---

## 📂 Folder Structure

<img width="184" height="204" alt="image" src="https://github.com/user-attachments/assets/034a6a47-eb47-4904-97ff-648c81a2e056" />

## 📸 Screenshots

<img width="800" height="427" alt="User Management" src="https://github.com/user-attachments/assets/dea1ac81-90c6-4010-a112-fd30e74a6b6b" />

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/riyasolanki/userManagement.git
cd userManagement

### 2️⃣ Install dependencies
npm install

### 3️⃣ Run the app
## Android
npx react-native run-android
## iOS
cd ios
pod install
cd ..
npx react-native run-ios

## 🔑 Test Credentials
Email: emily.johnson@x.dummyjson.com
Password: emilyspass

## 📡 API Used
- https://dummyjson.com/users
- Pagination implemented using limit & skip

## 📦 Build
## Android APK
cd android
./gradlew assembleRelease
path : android/app/build/outputs/apk/release/app-release.apk

## ❗ Error Handling
- API error handling with alerts
- Form validation using react-hook-form

## 📡 Offline Support
- Cached users stored locally
- Fallback to local data when offline
