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
    - [1. Clone Repository](#1-clone-repository)
    - [2. Backend Setup](#2-backend-setup)
      - [Configure Environment Variables](#configure-environment-variables)
      - [Start Backend Server](#start-backend-server)
    - [3. Frontend Setup](#3-frontend-setup)
      - [Configure Environment Variables](#configure-environment-variables-1)
      - [Start Frontend Client](#start-frontend-client)
    - [4. End-to-End Verification](#4-end-to-end-verification)
  - [⚙️ Environment Configuration](#️-environment-configuration)
    - [Backend (`backend/.env`)](#backend-backendenv)
    - [Frontend (`frontend/.env`)](#frontend-frontendenv)
  - [📡 REST API Endpoints](#-rest-api-endpoints)
    - [Authentication Routes (`/api/auth`)](#authentication-routes-apiauth)
    - [Post Routes (`/api/posts`)](#post-routes-apiposts)
  - [⚡ WebSocket Events](#-websocket-events)
  - [☁️ Deployment Guide](#️-deployment-guide)
    - [Backend on Render](#backend-on-render)
    - [Frontend on Vercel](#frontend-on-vercel)
  - [🔍 Troubleshooting \& Common Issues](#-troubleshooting--common-issues)
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
```

---

## 📁 Project Structure

```text
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
```

---

## 📋 Prerequisites

Before setting up the project locally, ensure you have the following installed and configured on your machine:

- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher (packaged automatically with Node.js)
- **Git**: Installed and configured on your terminal ([Download Git](https://git-scm.com/))
- **MongoDB Atlas Account**: A free cloud cluster instance ([Sign up for MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) or a local MongoDB service running on `mongodb://localhost:27017`

---

## 💻 Local Setup & Cloning Guide

Follow these steps to run both the frontend and backend development environments simultaneously.

### 1. Clone Repository

Open your terminal, navigate to your desired workspace directory, and clone the repository:

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

---

### 2. Backend Setup

Open a terminal window and navigate into the `backend/` directory:

```bash
cd backend
npm install
```

#### Configure Environment Variables
Create a local `.env` configuration file inside `backend/`:

```bash
# macOS / Linux
cp .env.example .env

# Windows (Command Prompt)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Open `backend/.env` in your editor and provide your variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.xxxxx.mongodb.net/socialfeed?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:5173
```

> **MongoDB Atlas Network Access:**  
> Ensure your IP address is whitelisted in MongoDB Atlas under **Security -> Network Access**. For development, allow access from anywhere (`0.0.0.0/0`) or add your current IP address.

#### Start Backend Server
Run the backend server using the hot-reloading development script:

```bash
npm run dev
```

*Verification:* The console output should indicate:
```text
Server running on port 5000
MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
```

---

### 3. Frontend Setup

Open a **new, separate terminal window or tab**, navigate to the `frontend/` directory:

```bash
cd frontend
npm install
```

#### Configure Environment Variables
Create a local `.env` configuration file inside `frontend/`:

```bash
# macOS / Linux
cp .env.example .env

# Windows (Command Prompt)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Open `frontend/.env` and verify the values match your local backend port:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

#### Start Frontend Client
Launch the Vite development server:

```bash
npm run dev
```

*Verification:* Vite will display a local server address:
```text
  VITE v5.x.x  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### 4. End-to-End Verification

1. Open your browser and navigate to `http://localhost:5173`.
2. Register a new user account (e.g., `user_alpha`).
3. Open a second browser window in **Incognito/Private Mode**, register another user account (e.g., `user_beta`), and publish a post or comment.
4. *Verification:* Confirm the second window's post and likes update instantly in real time on the first window without refreshing.

---

## ⚙️ Environment Configuration

Both the frontend and backend require environment files (`.env`) to function properly.

### Backend (`backend/.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Local port for Express and Socket.io server | `5000` |
| `MONGO_URI` | MongoDB Atlas SRV connection string with database name | `mongodb+srv://user:pass@cluster0.mongodb.net/socialfeed` |
| `JWT_SECRET` | Secret key used to sign and verify JSON Web Tokens | `your_secure_random_string` |
| `CLIENT_URL` | Allowed origin for CORS & WebSockets | `http://localhost:5173` *(Local)* or `https://app.vercel.app` *(Prod)* |

### Frontend (`frontend/.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base endpoint for Axios REST HTTP requests | `http://localhost:5000/api` |
| `VITE_SOCKET_URL` | Base host URL for Socket.io client connections | `http://localhost:5000` |

---

## 📡 REST API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a user (`username`, `email`, `password`, `role`) | Public |
| `POST` | `/api/auth/login` | Validate credentials and issue JWT token | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Private (Bearer) |

### Post Routes (`/api/posts`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/posts?page=1&limit=10` | Fetch paginated feed | Public |
| `POST` | `/api/posts` | Create a post (`content`, `imageUrl`) | Private (Bearer) |
| `PUT` | `/api/posts/:id` | Update post content | Author / Admin |
| `DELETE` | `/api/posts/:id` | Delete a post | Author / Admin |
| `PUT` | `/api/posts/:id/like` | Toggle atomic like state | Private (Bearer) |
| `POST` | `/api/posts/:id/comment` | Add discussion comment (`text`) | Private (Bearer) |

---

## ⚡ WebSocket Events

All real-time communications are transmitted via `Socket.io`:

| Event Name | Direction | Payload | Trigger |
| :--- | :--- | :--- | :--- |
| `post:created` | Server $\rightarrow$ Clients | `Post` object | Broadcast when any user submits a new post |
| `post:updated` | Server $\rightarrow$ Clients | `Post` object | Broadcast when a post is edited |
| `post:deleted` | Server $\rightarrow$ Clients | `postId` (string) | Broadcast when a post is removed |
| `post:liked` | Server $\rightarrow$ Clients | `{ postId, likes: [] }` | Broadcast when likes array updates |
| `post:commented` | Server $\rightarrow$ Clients | `{ postId, comments: [] }` | Broadcast when a reply is added |

---

## ☁️ Deployment Guide

### Backend on Render
1. Push your repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com/).
3. Connect your repository, set the **Root Directory** to `backend`.
4. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
5. Add your environment variables (`NODE_ENV=production`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`).
6. Deploy and copy your assigned service URL (e.g., `https://your-service.onrender.com`).

### Frontend on Vercel
1. Create a new project on [Vercel](https://vercel.com/) and import your repo.
2. Set **Root Directory** to `frontend`.
3. Select the **Vite** framework preset.
4. Add environment variables:
   - `VITE_API_BASE_URL` = `https://your-service.onrender.com/api`
   - `VITE_SOCKET_URL` = `https://your-service.onrender.com`
5. Deploy, copy the resulting domain, and update `CLIENT_URL` in Render's environment settings.

---

## 🔍 Troubleshooting & Common Issues

- **CORS Errors (`Reason: CORS request did not succeed`):**  
  Ensure `CLIENT_URL` on Render matches your frontend domain exactly with **no trailing slash** (e.g., `https://my-app.vercel.app`). Also verify that Render has completed waking up from cold-start sleep.
- **Mongoose `next is not a function`:**  
  In modern Mongoose (v6+), `pre('save')` hooks using `async` functions must not declare or invoke `next()`.
- **Database IP Blacklist (`MongooseServerSelectionError`):**  
  Add `0.0.0.0/0` to your MongoDB Atlas Network Access IP whitelist.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the project:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

```text
MIT License

Copyright (c) 2026 Your Name

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
```
---

## 👤 Author

Developed by **Saswata** ([@SaswataNX05](https://github.com/SaswataNX05)).

Feel free to fork, open an issue, or submit a pull request if you have ideas for improvements!