# AI-Driven Project Management System 🚀

An AI-powered project management web application that helps teams efficiently manage tasks using a Kanban board and intelligent AI recommendations for task prioritization and workflow optimization.

---

## 📌 Project Overview

The **AI-Driven Project Management System** is a full-stack MERN application designed to simplify task management while leveraging Artificial Intelligence to assist in decision-making. Users can securely register and log in, manage tasks across different stages, and receive AI-generated suggestions to improve productivity. The application also supports light and dark themes for better user experience.

---

## ✨ Key Features

- 🔐 **Authentication & Authorization**
  - Secure user registration and login using JWT
  - Protected routes for authenticated users

- 🗂 **Task Management**
  - Create, update, and delete tasks
  - Kanban-style board with **Todo**, **In Progress**, and **Done** columns
  - Real-time task updates stored in MongoDB

- 🤖 **AI Recommendations**
  - AI analyzes tasks and suggests priority and status improvements
  - Dedicated AI Suggestions panel on the dashboard
  - Integrated using a free LLM inference API (Groq)

- 🎨 **Modern UI**
  - Built with React and Material UI
  - Clean and responsive design
  - Light/Dark mode toggle with persistent theme preference

---

## 🛠 Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)

### AI Integration
- Groq API (LLM-based recommendations)

---

## 🏗 System Architecture

- The frontend communicates with the backend via RESTful APIs.
- Authentication is handled using JWT tokens.
- Task and user data are stored in MongoDB.
- For AI recommendations, the backend sends task summaries to the AI API and returns structured suggestions to the frontend.

---

## 🔄 Application Flow

1. User registers or logs in.
2. User is redirected to the dashboard.
3. User creates and manages tasks using the Kanban board.
4. AI analyzes tasks and provides recommendations.
5. User can switch between light and dark themes.

---

## 📸 Screenshots

_Add screenshots of the following here:_
- Login Page
- <img width="1221" height="827" alt="image" src="https://github.com/user-attachments/assets/0a3e6cf9-9020-4d95-89df-e002ce15bf1f" />

- Register Page
- <img width="1109" height="776" alt="image" src="https://github.com/user-attachments/assets/df32ee02-60cc-49ea-8885-934b3694ea37" />

- Dashboard (Light Mode)
- <img width="1880" height="869" alt="image" src="https://github.com/user-attachments/assets/6df235ec-b10a-4c73-929b-d327494196eb" />

- Dashboard (Dark Mode)
- <img width="1869" height="841" alt="image" src="https://github.com/user-attachments/assets/c62d9568-6b65-43e5-a66f-f12db91ea1b6" />

- Kanban Board
- <img width="1880" height="869" alt="image" src="https://github.com/user-attachments/assets/3a82fb5d-a7c0-40ba-8311-40a51baab463" />

- AI Recommendations Panel
- <img width="1888" height="465" alt="image" src="https://github.com/user-attachments/assets/ab893dd0-9480-4ebf-ac28-13dc7aafe8f2" />


---

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory and add:

```env
PORT=5000
MONGO_URI= abc
JWT_SECRET= jwt_secret
GROQ_API_KEY= groq_api_key
