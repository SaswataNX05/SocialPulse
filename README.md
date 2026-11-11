# 🌐 SocialPulse — Real-Time Social Media Platform

<!-- Badges / Tech Tags -->
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A full-stack, responsive real-time social networking platform built with the MERN stack and WebSockets. Features token-based authentication, role-based access control (User/Admin), complete CRUD post operations, atomic like updates, threaded discussions, and instantaneous timeline synchronization without page refreshes.

---

## 📑 Table of Contents

- [🌐 SocialPulse — Real-Time Social Media Platform](#-socialpulse--real-time-social-media-platform)
  - [📑 Table of Contents](#-table-of-contents)
  - [🚀 Key Features](#-key-features)
  - [🛠️ Tech Stack](#️-tech-stack)
    - [Frontend (Client)](#frontend-client)
    - [Backend (Server)](#backend-server)
  - [🏛️ Architecture \& Data Flow](#️-architecture--data-flow)
  - [📁 Project Structure](#-project-structure)
  - [📋 Prerequisites](#-prerequisites)
  - [💻 Local Setup \& Cloning Guide](#-local-setup--cloning-guide)
    - [1. Clone the Repository](#1-clone-the-repository)
- [🛠️ Backend Setup Guide](#️-backend-setup-guide)
  - [1. Navigate \& Install Dependencies](#1-navigate--install-dependencies)
  - [⚙️ 2. Environment Configuration for Backend](#️-2-environment-configuration-for-backend)
    - [Backend (`backend/.env`)](#backend-backendenv)
- [🛠️ Frontend Setup Guide](#️-frontend-setup-guide)
  - [1. Navigate \& Install Dependencies](#1-navigate--install-dependencies-1)
  - [⚙️ 2. Environment Configuration for frontend](#️-2-environment-configuration-for-frontend)
    - [Frontend (`frontend/.env`)](#frontend-frontendenv)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [👤 Author](#-author)

---

## 🚀 Key Features

- **Authentication & RBAC:** User registration and login powered by `bcryptjs` password hashing and stateless JSON Web Tokens (JWT). Role-Based Access Control differentiates standard members from platform administrators.
- **Content Creation & Management (CRUD):** Authors can draft text posts, attach images via direct URL, modify existing posts, and delete content. Administrators hold moderation privileges across all posts.
- **Engagement Engine:** Atomic like/unlike toggling with optimistic UI updates and nested discussion threads.
- **Real-Time WebSocket Synchronization:** Powered by `Socket.io`—new posts, deletions, updates, likes, and comments broadcast live across all active user windows with zero latency.
- **Paginated Feed Queries:** MongoDB cursor pagination (`skip` & `limit`) optimizes performance for expanding databases.
- **Modern Minimalist UI:** Built using Tailwind CSS, responsive single-column layouts, clean cards, and Lucide icons.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 18+ (Vite SPA)
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Icons:** Lucide React
- **HTTP Client:** Axios (with Bearer token interceptors)
- **Real-Time Client:** Socket.io-client

### Backend (Server)
- **Runtime:** Node.js (ES6 modules)
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose
- **Real-Time Server:** Socket.io
- **Security:** JSON Web Tokens (JWT), Bcrypt.js, CORS

---

## 🏛️ Architecture & Data Flow

```text
[ Browser Client A ]         [ Browser Client B ]
        │                             ▲
        │ 1. HTTP REST (POST/PUT/DEL)  │ 3. WebSocket Broadcast
        ▼                             │    (post:created, liked, etc.)
┌──────────────────────────────────────────────┐
│           Express + Socket.io Server         │
└──────────────────────┬───────────────────────┘
                       │ 2. Read / Write
                       ▼
            ┌──────────────────────┐
            │    MongoDB Atlas     │
            └──────────────────────┘

---

## 📁 Project Structure

social-feed-app/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection handler
│   ├── controllers/
│   │   ├── authController.js   # Register, Login, Profile endpoints
│   │   └── postController.js   # CRUD operations, Likes, Comments
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification & RBAC guards
│   ├── models/
│   │   ├── Post.js             # Post schema & comment subdocuments
│   │   └── User.js             # User schema with pre-save hashing
│   ├── routes/
│   │   ├── authRoutes.js       # /api/auth routes
│   │   └── postRoutes.js       # /api/posts routes
│   ├── .env.example
│   ├── package.json
│   └── server.js               # Main HTTP & Socket.io server
├── frontend/
│   ├── src/
│   │   ├── components/         # Navbar, PostCard, PostForm, ProtectedRoute
│   │   ├── context/            # AuthContext & SocketContext
│   │   ├── pages/              # Feed, Login, Register
│   │   ├── services/           # Axios API configuration
│   │   ├── App.jsx             # Router layout
│   │   ├── index.css           # Tailwind base styles
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md

---

## 📋 Prerequisites

Ensure you have the following installed and configured before running the project locally:

- **Node.js** (v18.x or higher) — [Download & Install Node.js](https://nodejs.org/)
- **npm** (v9.x or higher) or **yarn** (bundled with Node.js)
- **Git** — [Download & Install Git](https://git-scm.com/)
- A free **MongoDB Atlas** account — [Sign up for MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (or a local MongoDB instance running on `mongodb://localhost:27017`)

---

## 💻 Local Setup & Cloning Guide

Follow these steps to set up and run the full stack application on your local machine.

### 1. Clone the Repository

Open your terminal and clone the project to your desired directory:

```bash
git clone https://github.com/SaswataNX05/SocialPulse
cd SocialPulse

---

# 🛠️ Backend Setup Guide

Step-by-step instructions to configure and run the Express & Node.js backend server locally.

---

## 1. Navigate & Install Dependencies

Open a terminal window, move into the `backend/` directory, and install all required packages:

```bash
cd backend
npm install

---

## ⚙️ 2. Environment Configuration for Backend

Both the frontend and backend require environment files (`.env`) to function properly. Create these files locally by copying the provided templates.

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://<db_user>:<db_password>@cluster0.xxxxx.mongodb.net/socialfeed?retryWrites=true&w=majority
JWT_SECRET=your_jwt-key
CLIENT_URL=http://localhost:5173

---

# 🛠️ Frontend Setup Guide

Step-by-step instructions to configure and run the Express & Node.js backend server locally.

---

## 1. Navigate & Install Dependencies

Open a terminal window, move into the `frontend/` directory, and install all required packages:

```bash
cd frontend
npm install

---

## ⚙️ 2. Environment Configuration for frontend

Both the frontend and backend require environment files (`.env`) to function properly. Create these files locally by copying the provided templates.

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

---


## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome! Feel free to:
1. Fork the repository.
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request.

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE) (or open for personal/educational use).

MIT License

Copyright (c) 2026 Saswata

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 👤 Author

Developed by **Saswata** ([@SaswataNX05](https://github.com/SaswataNX05)).

Feel free to fork, open an issue, or submit a pull request if you have ideas for improvements!