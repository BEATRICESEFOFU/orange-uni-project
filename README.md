 Orange-Uni Student Portal — Frontend

Name: Godiraone Beatrice Sefofu  
Module: INFS 202  
Project: Individual Project

Project Description
Orange-Uni Student Portal is a modern web application built with React that allows staff to manage and view student records. The application provides a centralised directory of enrolled students, their academic programmes, and contact information.


Tech Stack
React — component-based UI
React Router— client-side routing
Vite — build tool and dev server
CSS — custom styling with responsive design

 Features
- Staff login with JWT authentication
- Browse all students in a card grid
- Search students by name or department
- Filter students by department
- View full student profile on details page
- Add new students via validated form
- Sign out functionality


Project Structure
src/
├── components/
│   ├── Navbar.jsx
│   └── StudentCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── List.jsx
│   ├── Details.jsx
│   ├── AddStudent.jsx
│   └── Login.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx

Routes
| Route | Page |
|-------|------|
| `/` | Home page |
| `/list` | Student directory |
| `/details/:id` | Student profile |
| `/add` | Add new student |
| `/login` | Staff login |

Setup Instructions

 Prerequisites
- Node.js installed
- Backend server running

Run locally
bash
git clone https://github.com/BEATRICESEFOFU/orange-uni-project.git
cd orange-uni-project
npm install
npm run dev

Open `http://localhost:5173`

## Live URL
**Frontend:** https://orange-uni-project.vercel.app  
**Backend API:** https://orange-uni-backend.onrender.com