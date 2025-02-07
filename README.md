# Skylink

## About
Skylink – Our submission for Innverve 9.0 Hackathon by AIT Pune ✈️
A real-time in-flight communication system with live updates, AI-moderated chat, offline messaging, and secure interactions—making air travel more connected and engaging. 🚀

## Table of Contents
- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Team Members](#team-members)
- [Future Enhancements](#future-enhancements)
- [Installation](#installation)
- [Acknowledgements](#acknowledgements)

## Introduction
Skylink is a real-time flight chatroom with in-flight offline messaging designed to enhance the passenger experience by enabling seamless communication before, during, and after flights.

## Problem Statement
Air travel can often feel isolating, and passengers may want to connect with fellow travelers for discussions, networking, or sharing flight-related updates. Skylink aims to create a chatroom system where passengers can interact 48 hours before departure and up to 6 hours after arrival, while also enabling offline messaging during the flight.

## Solution
Skylink addresses these challenges by providing:
- A real-time chatroom accessible 48 hours before departure and 6 hours post-arrival.
- AI-moderated chat to ensure a safe and respectful environment.
- Peer-to-peer offline messaging to enable in-flight communication without an internet connection.
- Integration with real-time flight updates for passengers.

## Key Features
- **Real-Time Chatroom:** Connect with co-passengers before, during, and after the flight.
- **Offline Messaging:** Messages are stored and delivered once online.
- **AI Moderation:** Detects and filters spam, offensive content, and hate speech.
- **Privacy-First Approach:** Nickname-based entry system to ensure anonymity.
- **Flight Updates Integration:** Receive real-time flight status notifications.

## Screenshots
*(Add screenshots of the UI here)*

## Technology Stack
### **Frontend:**
- React Native (Expo)

### **Backend:**
- Firebase (Firestore Authentication & Realtime Database)
- Node.js

### **AI Moderation:**
- TensorFlow
- PyTorch
- BERT Model
- Gemini API

### **Offline Messaging:**
- Peer-to-Peer Communication (Bluetooth / Local Network)

## Team Members
- **Harshita Yadav** - UI/UX, Researcher
- **Ishan Bagra** - Frontend Developer
- **Vipul Dixit** - Backend Developer
- **Jai Taneja** - AI/ML Developer

## Future Enhancements
- Improved AI moderation with multilingual support.
- Enhanced offline messaging using hybrid P2P and cloud syncing.
- Integration with airline booking platforms.

## Installation
### Prerequisites
- Node.js installed
- Expo CLI installed
- Firebase project set up

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/skylink.git
   cd skylink
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure Firebase:
   - Create a Firebase project.
   - Enable Firestore and Authentication.
   - Copy Firebase config and paste it inside `firebaseConfig.js`.
4. Run the application:
   ```sh
   expo start
   ```

## Acknowledgements
- Innverve 9.0 Hackathon Team
- UdChalo for providing the problem statement
- Our mentors and peers for their guidance and support
