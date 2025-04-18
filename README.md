# Task Manager App

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/React-%2320232A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Flask](https://img.shields.io/badge/Flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=%23fff)
![SQLite](https://img.shields.io/badge/SQLite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=fff)

This is a full-stack Task Manager application designed to help users efficiently manage their tasks. It offers a user-friendly interface built with React and a robust backend powered by Flask and SQLite.

---

## ✨ Features

- *Add New Tasks:* Easily add tasks with a title, detailed description, and a specific due date.
- *Edit Existing Tasks:* Modify the title, description, or due date of existing tasks (excluding those marked as completed).
- *Delete Tasks:* Remove tasks that are no longer needed.
- *Mark as Complete/Pending:* Toggle the completion status of tasks to keep track of your progress.
- *Sort by Due Date:* Organize your tasks chronologically to prioritize effectively.
- *Filter by Status:* View tasks based on their completion status (all, pending, or completed).
- *Responsive Design:* Enjoy a seamless experience across various devices, from mobile phones to desktop computers.
- *Enhanced User Experience:* Benefit from smooth interactions like automatic scrolling to the edit form and informative toast notifications for actions.

---

## 🛠 Prerequisites

Before you begin, ensure you have the following installed on your system:

1.  *Node.js and npm (or yarn):* Download from [https://nodejs.org/](https://nodejs.org/) or [https://yarnpkg.com/](https://yarnpkg.com/).
2.  *Python 3.6+:* Download from [https://www.python.org/downloads/](https://www.python.org/downloads/).
3.  *pip (Python Package Installer):* Usually installed with Python. Verify with pip --version.
4.  *SQLite:* Integrated with Python; no separate installation needed.

---

## 🚀 Setup Instructions

Follow these steps to get the Task Manager application running locally.

### ⚙ Frontend Setup

1.  *Navigate to the frontend directory:*
    bash
    cd frontend
    
2.  *Install npm packages (or yarn dependencies):*
    bash
    npm install
    # or
    yarn install
    
3.  *Start the frontend development server:*
    bash
    npm start
    # or
    yarn start
    
    Access the frontend at http://localhost:3000.

### ⚙ Backend Setup

1.  *Navigate to the backend directory:*
    bash
    cd backend
    
2.  *Install Python dependencies:*
    bash
    pip install -r requirements.txt
    
    *(Create requirements.txt with Flask and Flask-CORS if it doesn't exist.)*
3.  *Initialize the SQLite database:*
    Ensure schema.sql is in the backend directory and run:
    bash
    flask --app app initdb
    
4.  *Start the Flask backend server:*
    bash
    python app.py
    
    The backend will run at http://localhost:5000.

---

## 📂 Folder Structure