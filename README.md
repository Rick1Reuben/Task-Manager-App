# Task Manager App

This is a full-stack Task Manager application that allows users to manage their tasks efficiently. The application includes features like adding, editing, deleting, sorting tasks by due date, marking tasks as complete, and filtering tasks. It is built using **React** for the frontend and **Flask** with SQLite for the backend.

---

## Features
- Add new tasks with titles, descriptions, and due dates.
- Edit existing tasks (except completed ones).
- Delete tasks.
- Mark tasks as complete or pending.
- Sort tasks by due date.
- Filter tasks based on their completion status.
- Responsive design for mobile and desktop users.
- Smooth UX enhancements like scrolling on edit and toast notifications.

---

## Prerequisites
Before running the application, ensure you have the following installed:
1. **Node.js and npm** (for the frontend): Download from [Node.js Official Website](https://nodejs.org/).
2. **Python** (for the backend): Download from [Python Official Website](https://www.python.org/).
3. **pip**: Python package manager (comes with Python installation).
4. **SQLite**: Already integrated with Python (no separate installation needed).

---

## Setup Instructions

### **Frontend Setup**
1. Open a terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
Install the required npm packages:

bash
npm install
Start the frontend development server:

bash
npm start
The frontend server will start, and you can access the app by navigating to http://localhost:3000 in your browser.

Backend Setup
Open a terminal and navigate to the backend directory:

bash
cd backend
Install the required Python packages using pip:

bash
pip install flask flask-cors
Initialize the SQLite database:

Make sure the schema.sql file is in the backend directory.

Run the following command:

bash
flask --app app initdb
This will create a tasks.db database using your schema.

Start the Flask backend server:

bash
python app.py
The backend server will start at http://localhost:5000.

Folder Structure
Task-Manager-App/
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── app.py
│   ├── tasks.db
│   ├── schema.sql
│   └── requirements.txt
API Endpoints
GET /tasks
Retrieves all tasks.

Supports sorting by due date using the query parameter sort=due_date.

POST /tasks
Adds a new task.

Requires JSON input with title, description, and optionally due_datetime.

PUT /tasks/<task_id>
Updates an existing task.

Requires JSON input with updated fields (title, description, due_datetime, completed).

DELETE /tasks/<task_id>
Deletes the task with the specified ID.

Common Issues
Frontend
react-toastify module not found:

Run:

bash
npm install react-toastify
Restart the development server:

bash
npm start
Backend
flask or flask-cors module not found:

Run:

bash
pip install flask flask-cors
Database not initialized:

Ensure schema.sql is in the backend directory.

Run:

bash
flask --app app initdb
Contributions
Feel free to open issues and submit pull requests if you find bugs or want to contribute new features!