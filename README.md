# Skylink - In-Flight Communication System

### About
Skylink – Our submission for **Innverve 9.0 Hackathon** by **AIT Pune** ✈️  
A real-time in-flight communication system with **live updates, AI-moderated chat, peer-to-peer offline messaging**, and secure interactions—making air travel more connected and engaging. 🚀

---
## 📑 Table of Contents
1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Solution](#solution)
4. [Key Features](#key-features)
5. [Screenshots](#screenshots)
6. [Technology Stack](#technology-stack)
7. [Team Members](#team-members)
8. [Future Enhancements](#future-enhancements)
9. [Installation](#installation)
10. [Acknowledgments](#acknowledgments)

---

## 📌 Introduction
Air travel can often feel isolated, with passengers lacking a seamless way to communicate. Skylink bridges this gap by enabling **real-time chatrooms**, **AI-powered moderation**, and **offline peer-to-peer messaging**, ensuring a more **engaging and connected experience** before, during, and after flights. Passengers can **connect, share information, and receive flight updates**, all while maintaining privacy and security.

---

## ❓ Problem Statement
Modern air travel lacks an interactive, real-time communication system for passengers. Skylink provides an **in-flight chatroom** where passengers can **connect, network, and share updates**, even without internet connectivity.

---

## 💡 Solution
Skylink addresses these challenges by providing:

- **Pre & Post Flight Chatrooms** 🗨️ (Available 48 hours before departure & 6 hours after landing)
- **Privacy-Focused Nickname-Based User Entry** 🔑 (No personal data exposure)
- **AI Moderation** 🤖 (Detects offensive content using **PyTorch & BERT Model**)
- **Dual Chat Tabs** 🏷️ (Separate tabs for **Online Chat** and **Offline Chat**)
  - **Online Chat:** Real-time chatrooms powered by Supabase
  - **Offline Chat:** Peer-to-peer messaging without internet
- **Real-Time Flight Updates** ✈️ (Gate changes, delays, baggage claim updates)
- **Seamless User Experience** 📱 (Optimized for multi-device access)

---

## 🚀 Key Features
✅ **Real-Time Chatrooms** for passengers on the same flight (via Supabase)  
✅ **Offline Messaging** using Peer-to-Peer Communication (Local Network)  
✅ **AI-Powered Moderation** to prevent spam & abuse  
✅ **Dual Chat System** with Online & Offline chat tabs  
✅ **Flight Notifications** for real-time updates  
✅ **Privacy-Focused Nickname-Based Login**  
✅ **Multi-Platform Compatibility** (Web, Mobile)  

---

## 🖼 Screenshots
_(Coming Soon)_

---

## 🛠 Technology Stack
**Frontend:** React Native, TailwindCSS  
**Backend:** Supabase (Authentication, Database, Real-time Chat)  
**AI Moderation:** PyTorch, BERT Model, Gemini API  
**Offline Messaging:** Peer-to-Peer Communication (WebRTC / Local Network)  

---

## 👨‍💻 Team Members
- **Harshita Yadav** - UI/UX Designer, Researcher
- **Ishan Bagra** - Frontend Developer
- **Vipul Dixit** - Backend Developer
- **Jai Taneja** - AI/ML Developer

---

## 🔮 Future Enhancements
- **Voice Chat Integration** 🎙️ (For real-time audio communication)
- **End-to-End Encryption for Secure Messaging** 🔒 (Enhanced privacy and security)
- **AR-Based Flight Information Overlay** 🛫 (Augmented reality for flight details)
- **Integration with Airlines' Booking Systems** 📅 (Seamless travel experience)
- **Advanced AI Model for Enhanced Chat Moderation** 🤖 (Improved detection of harmful content)
- **Better Multi-Platform Optimization** 📱 (For seamless web and mobile use)
- **Integration of Saarthi AI Bot** ✈️ (AI assistant for real-time flight info and chat moderation)

---

## ⚙️ Installation
### Prerequisites
- **Node.js & npm installed**
- **React Native CLI installed**
- **Supabase Project Setup**

### Steps to Run Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/skylink.git
   cd Application-SkyLink
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Configure Supabase**
   - Create a project in **Supabase**.
   - Navigate to the **Supabase Dashboard** and get the **API keys**.
   - Create a `.env` file and add the Supabase keys:
     ```env
     SUPABASE_URL=your_supabase_url
     SUPABASE_KEY=your_supabase_anon_key
     ```
4. **Start the React Native App**
   ```sh
   npx react-native run-android  # For Android
   ```
   - For iOS, use:
     ```sh
     npx react-native run-ios
     ```

---

## 🙏 Acknowledgments
Special thanks to **Innverve 9.0 Hackathon** & **UDCHALO** for providing the opportunity to build this innovative solution! 🎉
