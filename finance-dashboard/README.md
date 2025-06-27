# 📊 Finance Dashboard

A modern, full-stack finance dashboard web app built with **React**, **TypeScript**, **Node.js**, **Express**, **MongoDB**, and **MUI**. This dashboard allows you to track, visualize, and analyze financial transactions in a clean, responsive interface with dynamic charts, filters, and export features.

---

## 🛠️ Tech Stack

| Layer        | Technologies Used                                         |
|--------------|-----------------------------------------------------------|
| **Frontend** | React, TypeScript, Vite, MUI (Material UI), Recharts      |
| **Backend**  | Node.js, Express.js, TypeScript                           |
| **Database** | MongoDB                                                   |
| **Styling**  | MUI v5, Custom Dark/Light Theme                           |
| **Charts**   | Recharts (Line Charts for financial trends)               |
| **Auth**     | JWT-ready setup, Bcrypt                                   |
| **Tools**    | Docker, Git, VSCode                                       |

---

## 📁 Project Structure

\`\`\`
finance-dashboard/
├── client/           # React + Vite frontend
├── server/           # Express + TypeScript backend
├── docker-compose.yml
├── README.md
└── .env (your secrets)
\`\`\`

---

## 🚀 Features

✅ Modern dashboard layout with:

- 📈 Dynamic **Monthly Revenue vs Expense** chart
- 🧾 **Transactions Table** with:
  - Search by user, status, category
  - Filter by **category** & **status**
  - CSV Export button
  - Custom styling and avatars
- 🎨 Theme toggle (Light / Dark mode)
- 👤 User profile images (avatars)
- 🧠 Optimized and responsive design
- 🐳 Full **Docker support**
- 🔐 JWT-ready backend (add auth with ease later)

---

## 🧑‍💻 How to Run This Project

### ⚙️ Prerequisites

- Node.js \`v18+\`
- npm (v9+) or yarn
- MongoDB installed locally or use MongoDB Atlas
- Docker & Docker Compose (**optional**, but recommended)

---

### ✅ Option 1: Run with Docker (Recommended)

1. Make sure Docker is running.
2. Then from the **project root**:

\`\`\`bash
docker-compose up --build
\`\`\`

This will:
- Start MongoDB, backend, and frontend containers
- App will be available at:
  - Frontend → \`http://localhost:5173\`
  - Backend → \`http://localhost:5000\`

---

### 🧰 Option 2: Run Locally Without Docker

#### 🖥 Backend Setup

\`\`\`bash
cd server
cp .env.example .env         # Fill in Mongo URI and JWT_SECRET
npm install
npm run dev
\`\`\`

Runs at: \`http://localhost:5000\`

#### 🌐 Frontend Setup

\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

Runs at: \`http://localhost:5173\`

---

### 🔐 Sample \`.env\` for Server

\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-dashboard
JWT_SECRET=supersecretkey123
\`\`\`

---



## 🐳 Docker Image & DockerHub Push

\`\`\`bash
# Build the image (from project root)
docker build -t yourusername/finance-dashboard .

# Push to DockerHub
docker push yourusername/finance-dashboard
\`\`\`

Update \`docker-compose.yml\` with your custom image name if needed.

---




## 🧯 Troubleshooting & Tips

| Issue | Fix |
|-------|-----|
| **MongoDB not connecting?** | Make sure MongoDB is running locally or update your \`.env\` with a correct Atlas URI |
| **Port already in use?** | Kill conflicting processes or change \`PORT\` in \`.env\` |
| **CORS errors?** | Ensure backend has CORS enabled (\`cors()\` in Express) |
| **Docker not working on Windows?** | Use **WSL2 backend** and make sure Docker Desktop is properly configured |
| **App won’t start?** | Run \`npm install\` in both \`client\` and \`server\` folders, check logs |

---

## 🧼 Useful Commands

\`\`\`bash
# Run both client + server manually
npm run dev         # from client/
npm run dev         # from server/

# Run both together (optional setup)
npm install concurrently --save-dev
# Add to root package.json:
# "dev": "concurrently \"npm run dev --prefix client\" \"npm run dev --prefix server\""
\`\`\`

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to add authentication, improve the UI, or contribute tests — go for it.

---

## 🌍 Connect

Made with ❤️ by [Shreyash] – for personal/educational/demo purposes.