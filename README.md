# Expense Tracker

A blazing fast, offline-first mobile expense tracker built with React Native (Expo).
Designed with a primary goal: **logging an expense should take under 10 seconds from opening the app.**

## 🚀 Key Features

*   **Offline-First & Instant:** All expenses are logged to local SQLite instantly. No loading spinners, ever.
*   **Frictionless UX:** Custom built-in number pad, smart defaults, and 1-tap categorization. System keyboard never appears.
*   **Voice Logging (WIP):** Record your expense via microphone. Pre-fills category, amount, and payment method via keyword matching.
*   **Cloud Sync (Upcoming):** Supabase runs silently in the background strictly to sync local SQLite databases — UI is never blocked by network latency.
*   **Minimalist Dark Theme:** Sleek, high-contrast UI tailored for modern iOS & Android devices.

## 🛠️ Tech Stack

*   **Framework:** React Native / Expo
*   **Storage:** SQLite (`expo-sqlite`)
*   **State Management:** Zustand
*   **Navigation:** React Navigation v7 (Bottom Tabs)

## 📦 Getting Started

### 1. Requirements

*   Node.js (v20+ recommended)
*   npm or yarn
*   Expo Go app installed on your physical mobile device (or iOS simulator/Android emulator)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
npm install
```

### 3. Environment Setup

*   Create a `.env` file at the root of the project.
*   Copy the keys from `.env.example` to your `.env` file and insert your actual Supabase references (if testing Phase 2 Sync features).

```bash
cp .env.example .env
```

### 4. Running the App

Start the Expo development server:

```bash
npx expo start --clear
```

Scan the QR code printed in the terminal with the Expo Go app. 

## 🗺️ Roadmap & Phases

- [x] **Phase 1: Core Logging**
  - Offline SQLite data layer
  - Home screen + total tracking
  - Log Sheet with custom number pad & smart defaults
- [ ] **Phase 2: Sync & Trends**
  - Supabase background sync queue
  - Voice transcription `lib/parseVoice.ts` integration
  - Month/Category trend charts
