# BeXtaineR: AI Life Assistant


<h1 align="center">BeXta1neR's Personal AI System</h1>

<p align="center">
  <strong>"Arise."</strong> - A personal leveling system for your daily life, inspired by Jinwoo's "System" from Solo Leveling.
</p>

<p align="center">
  <img alt="Platform" src="https://img.shields.io/badge/platform-Android-brightgreen.svg"/>
  <img alt="Framework" src="https://img.shields.io/badge/framework-React%20Native%20%7C%20Expo-blueviolet"/>
  <img alt="AI" src="https://img.shields.io/badge/AI-Google%20Gemini-blue"/>
</p>

---

## 🔮 System Overview

**Solo System** is a mobile application designed to be a daily life management, personal growth, and AI-assisted productivity tool. It gamifies self-improvement by tracking health, skills, and projects, all wrapped in a clean, futuristic, anime-inspired UI. The system is powered by an integrated AI assistant that provides guidance and generates creative content to enhance your digital presence.

This project was built from zero knowledge to a fully functional app, serving as a comprehensive learning journey into modern mobile development.

---

## ✨ Features

The system is organized into several core modules, accessible via a clean tab-based navigation.

### 🏠 Home Dashboard
* **Interactive Stats:** Track daily water and calorie intake with quick-add and reset buttons.
* **Quest Tracking:** Manage your daily habits ("quests") with full CRUD (Create, Read, Update, Delete) functionality. Features swipe-to-delete and satisfying animations.
* **Daily Progress:** A circular progress bar dynamically visualizes the percentage of completed quests for the day.

### 💪 Workout Module
* **Dynamic Daily Schedule:** The app automatically displays the correct workout and diet plan for the current day of the week.
* **Interactive Tracking:** Log your progress for each exercise with set counters and section-wide progress bars.
* **Offline GIF Tutorials:** Tap any exercise to view a lightweight, looping GIF tutorial, ensuring you can train effectively without an internet connection.

### 🚀 Projects Module
* **Long-Term Goal Tracking:** Add and manage your personal and professional projects.
* **Lifecycle Management:** Update a project's status through a structured lifecycle (`Not Started`, `Wireframing`, `Coding`, etc.), with the progress bar updating automatically.

### 🤖 AI Assistant
* **Intelligent Chat:** A fully integrated AI assistant powered by the **Google Gemini API** that maintains conversation history and follows a custom persona.
* **AI Content Engine:** Generate high-quality, relevant content packages (LinkedIn posts, Twitter/X posts, and Instagram Reel scripts) based on your current project progress.
* **Utility Functions:** Easily copy AI responses or clear the conversation history.

---

## 🛠️ Tech Stack & Architecture

This application was built with a modern, efficient, and scalable mobile stack.

* **Framework:** React Native with Expo
* **Routing:** Expo Router (File-based routing)
* **State Management:** Zustand (with `persist` middleware for persistence)
* **Local Storage:** AsyncStorage
* **AI:** Google Gemini API (`@google/generative-ai`)
* **UI & Styling:**
    * Glassmorphism & Neumorphism-inspired design
    * Custom-built components with React Native's StyleSheet
    * `expo-blur` and `expo-linear-gradient` for aesthetic effects
* **Animations & Gestures:**
    * Moti for declarative animations
    * React Native Reanimated
    * React Native Gesture Handler for swipe-to-delete functionality
* **Icons:** Feather Icons (`@expo/vector-icons`)

---

## ⚙️ Setup & Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    * Create a file named `.env` in the root of the project.
    * Add your Google Gemini API key to this file:
        ```
        GEMINI_API_KEY="your_api_key_here"
        ```
    * Update the `app.config.js` file to expose this key (see the `extra` object).

4.  **Run the application:**
    * Start the Metro bundler:
        ```bash
        npx expo start --clear
        ```
    * Scan the QR code with the Expo Go app on your Android device.

---

## 🚀 Final Build (APK)

To build the standalone installable APK for Android:

```bash
eas build --platform android