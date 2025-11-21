# 🎮 OGT Cybersecurity Learning Game   

An interactive, modern, animated cybersecurity learning platform built by **OGT**.  
This game teaches web security vulnerabilities through hands-on levels, real attack simulations, hints, animations, and mini-tutorials.


![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

# 🌐 Live Demo   
👉 **https://ogtamimi.github.io/OGT-Cyber-Game/**

---

# 🚀 Features

- 🎯 **3 Fully Interactive Vulnerability Levels**
  - SQL Injection (Login Bypass)
  - Cross-Site Scripting (XSS)
  - IDOR (Unauthorized Access)

- ✨ **Modern Animated UI (React + Vite)**
- 💡 **Dynamic Hint System**
- 📘 **Mini Tutorials for Each Level**
- 🎉 **Success Animations + Flags**
- 🗂 **LocalStorage Progress Tracking**
- 📱 **Fully Responsive Design**
- 👨‍💻 **Includes Realistic Vulnerable PHP Endpoints**

---

# 🧩 Levels Overview

### ⭐ Level 1 – SQL Injection  
Learn how login bypass works using classic `' OR '1'='1`.

### ⭐ Level 2 – XSS  
Inject JavaScript and see how websites become vulnerable.

### ⭐ Level 3 – IDOR  
Access hidden files by modifying URL parameters.

---

# ⚙️ Tech Stack

- **React + Vite**
- **TypeScript**
- **TailwindCSS**
- **CSS Animations**
- **PHP (vulnerable backend)**
- **GitHub Pages Hosting**

---

# 🛠 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ogtamimi/OGT-Cyber-Game.git
cd OGT-Cyber-Game
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the development server
```bash
npm run dev
```

### 4️⃣ Build the production version
```bash
npm run build
```

### 5️⃣ Deploy to GitHub Pages (optional)
```bash
npm run deploy
```

### 📝 Notes
- Requires **Node.js 18+**
- `.env.local` is optional (for API keys)
- Final build output is inside the `/dist` folder

---

# 📂 Project Structure

```txt
OGT-Cyber-Game/
│
├── assets/
│   └── screenshots/
│       ├── screenshot1.png
│       ├── screenshot2.png
│       └── screenshot3.png
│
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   │
│   ├── components/
│   │   ├── Confetti.tsx
│   │   ├── Icons.tsx
│   │   ├── TutorialContent.tsx
│   │   └── UI.tsx
│   │
│   └── levels/
│       ├── Level1SQLi.tsx
│       ├── Level2XSS.tsx
│       └── Level3IDOR.tsx
│
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── .gitignore
```

---

# 🖼️ Screenshots

### 🏠 Home Page
![Home](https://raw.githubusercontent.com/ogtamimi/OGT-Cyber-Game/main/assets/screenshots/screenshot1.png)

### 🎮 Level Example
![Level](https://raw.githubusercontent.com/ogtamimi/OGT-Cyber-Game/main/assets/screenshots/screenshot2.png)

### 🏆 Brief Screen
![Brief](https://raw.githubusercontent.com/ogtamimi/OGT-Cyber-Game/main/assets/screenshots/screenshot3.png)

---

# 👑 Author
**OGT**  
🔗 GitHub: https://github.com/ogtamimi  
📧 Contact: **ogttamimi@gmail.com**

---

📜 License

MIT License (c) 2025 OGT
This project is open-source for learning and educational use.

