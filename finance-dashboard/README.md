
# 📊 Finance Dashboard

A responsive, modern full-stack finance dashboard web application that helps visualize and manage revenue and expenses. It supports dynamic filtering, CSV export, light/dark theming, JWT-ready backend, Docker support, and more.

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Material UI (MUI), Recharts
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB
- **Styling**: MUI Custom Themes (Dark/Light Mode)
- **Charting**: Recharts (Line Charts)
- **Containerization**: Docker & Docker Compose
- **Authentication**: JWT (ready for extension)
- **Utilities**: ESLint, Prettier, Git, GitHub

---

## Features

- 📈 Visual overview of Revenue vs Expenses
- 📋 Transaction table with:
  - Category and status filters
  - Full-text search
  - Pagination and custom column styling
- 🎨 Light/Dark theme toggle
- 👤 Recent user avatars with profile images
- 🧾 Export transaction data to CSV
- 🔐 JWT-ready backend
- 💻 Fully responsive design
- 🐳 Dockerized deployment support

---

## Project Structure

```bash
finance-dashboard/
├── client/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Main dashboard page
│   │   └── ...
│   └── public/
│
├── server/                   # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── routes/           # API endpoints
│   │   ├── models/           # Mongoose models
│   │   └── ...
│   └── .env.example
│
├── docker-compose.yml        # Compose file for full stack
└── README.md
````

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

* **Node.js** (v18+)
* **MongoDB** (local or MongoDB Atlas)
* **Docker & Docker Compose** (optional)
* **Git**

---

### 🚀 Run the App Locally

#### 1. Backend Setup

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

> Runs at: `http://localhost:5000`

#### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

> Runs at: `http://localhost:5173`

---

### 🐳 Dockerized Setup (Recommended)

```bash
docker-compose up --build
```

> This starts both the client, server, and MongoDB in containers.

* Frontend → `http://localhost:5173`
* Backend → `http://localhost:5000`

---

## Example `.env` for Server

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-dashboard
JWT_SECRET=supersecretkey123
```

---

## Docker: Build & Push Image

```bash
# Build your image (from root)
docker build -t yourusername/finance-dashboard .

# Push it to DockerHub
docker push yourusername/finance-dashboard
```

Update `docker-compose.yml` to use this image in production.



---

## Contributing

1. Fork the repo 🍴
2. Create a new branch: `feature/your-feature`
3. Commit and push
4. Create a pull request ✅

---

## License

Licensed under the **MIT License**.

---

## GitHub Repo

> [https://github.com/yashx007/Finance-App](https://github.com/yashx007/Finance-App)

---

