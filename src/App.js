import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:5000/tasks';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL, {
                params: { sort: filter === 'due_date' ? 'due_date' : undefined },
            });
            setTasks(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            toast.error('Failed to fetch tasks!');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') setNewTaskTitle(value);
        else if (name === 'description') setNewTaskDescription(value);
        else if (name === 'dueDate') setNewTaskDueDate(value);
    };

    const handleAddOrEditTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                if (editingTask) {
                    const response = await axios.put(`${API_URL}/${editingTask.id}`, {
                        title: newTaskTitle.trim(),
                        description: newTaskDescription.trim(),
                        due_datetime: newTaskDueDate,
                    });
                    setTasks(tasks.map(task => (task.id === editingTask.id ? response.data : task)));
                    toast.success('Task updated successfully!');
                    setEditingTask(null);
                } else {
                    const response = await axios.post(API_URL, {
                        title: newTaskTitle.trim(),
                        description: newTaskDescription.trim(),
                        due_datetime: newTaskDueDate,
                        completed: false,
                    });
                    setTasks([...tasks, response.data]);
                    toast.success('Task added successfully!');
                }
                resetForm();
            } catch (err) {
                setError(err.message);
                toast.error('Failed to save task!');
            }
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
            toast.success('Task deleted successfully!');
        } catch (err) {
            setError(err.message);
            toast.error('Failed to delete task!');
        }
    };

    const handleMarkComplete = async (id) => {
        try {
            const task = tasks.find(task => task.id === id);
            const response = await axios.put(`${API_URL}/${id}`, { ...task, completed: !task.completed });
            setTasks(tasks.map(t => (t.id === id ? response.data : t)));
            const message = task.completed ? 'Marked task as pending!' : 'Marked task as complete!';
            toast.success(message);
        } catch (err) {
            setError(err.message);
            toast.error('Failed to update task!');
        }
    };

    const resetForm = () => {
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskDueDate('');
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        fetchTasks();
    };

    const handleEditTask = (task) => {
        if (task.completed) {
            toast.warn('Cannot edit completed tasks!');
            return;
        }
        setEditingTask(task);
        setNewTaskTitle(task.title);
        setNewTaskDescription(task.description);
        setNewTaskDueDate(task.due_datetime);

        // Scroll to the top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Provides a smooth scrolling animation
        });
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <div className="input-section">
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={newTaskTitle}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newTaskDescription}
                    onChange={handleInputChange}
                />
                <input
                    type="datetime-local"
                    name="dueDate"
                    value={newTaskDueDate}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddOrEditTask}>
                    {editingTask ? 'Save Changes' : 'Add Task'}
                </button>
            </div>
            <div>
                <select onChange={handleFilterChange} value={filter}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="due_date">Sort by Due Date</option>
                </select>
            </div>
            <ul className="task-list">
                {filteredTasks.map(task => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <strong>{task.title}</strong>
                        {task.description && <p>{task.description}</p>}
                        {task.due_datetime && <small>Due: {new Date(task.due_datetime).toLocaleString()}</small>}
                        <button
                            className="complete-btn"
                            onClick={() => handleMarkComplete(task.id)}>
                            {task.completed ? 'Mark Pending' : 'Mark Complete'}
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => handleDeleteTask(task.id)}>
                            Delete
                        </button>
                        <button
                            className="edit-btn"
                            onClick={() => handleEditTask(task)}>
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
}

export default App;
