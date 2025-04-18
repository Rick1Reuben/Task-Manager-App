from flask import Flask, request, jsonify, g
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATABASE = 'tasks.db'

def get_db():
    """Gets the database connection for the current application context."""
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
    return g.db

@app.teardown_appcontext
def close_db(error):
    """Closes the database connection at the end of the application context."""
    if hasattr(g, 'db'):
        g.db.close()

def init_db():
    """Initializes the database by running the schema."""
    with app.app_context():
        db = get_db()
        with open('schema.sql', 'r') as f:
            db.cursor().executescript(f.read())
        db.commit()
    print('Initialized the database.')

@app.cli.command('initdb')
def initdb_command():
    """Flask CLI command to initialize the database."""
    init_db()

def query_db(query, args=(), one=False):
    """Queries the database and returns the result."""
    db = get_db()
    cursor = db.execute(query, args)
    results = cursor.fetchall()
    cursor.close()
    return (results[0] if results else None) if one else results

def execute_db(query, args=()):
    """Executes a database command (INSERT, UPDATE, DELETE) and commits changes."""
    db = get_db()
    cursor = db.execute(query, args)
    db.commit()
    affected_rows = cursor.rowcount
    cursor.close()
    return cursor.lastrowid  # Returns the last inserted row ID

@app.route('/tasks', methods=['GET'])
def get_tasks():
    """Retrieves all tasks and optionally sorts by due date."""
    sort = request.args.get('sort')
    query = 'SELECT id, title, description, due_datetime, completed FROM tasks'
    if sort == 'due_date':
        query += ' ORDER BY due_datetime ASC'
    tasks = query_db(query)
    return jsonify([dict(task) for task in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    """Adds a new task."""
    data = request.get_json()
    title = data.get('title')
    description = data.get('description', '')
    due_datetime_str = data.get('due_datetime')
    due_datetime = None
    completed = False
    if due_datetime_str:
        try:
            due_datetime = datetime.fromisoformat(due_datetime_str)
        except ValueError:
            return jsonify({'error': 'Invalid due_datetime format. Use ISO format (YYYY-MM-DDTHH:MM:SSZ)'}), 400

    if not title:
        return jsonify({'error': 'Title is required'}), 400

    task_id = execute_db(
        'INSERT INTO tasks (title, description, due_datetime, completed) VALUES (?, ?, ?, ?)',
        (title, description, due_datetime, completed)
    )
    task = query_db('SELECT id, title, description, due_datetime, completed FROM tasks WHERE id = ?', [task_id], one=True)
    return jsonify(dict(task)), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """Updates a specific task."""
    data = request.get_json()
    title = data.get('title')
    description = data.get('description', '')
    due_datetime_str = data.get('due_datetime')
    due_datetime = None
    completed = data.get('completed')
    if due_datetime_str:
        try:
            due_datetime = datetime.fromisoformat(due_datetime_str)
        except ValueError:
            return jsonify({'error': 'Invalid due_datetime format. Use ISO format (YYYY-MM-DDTHH:MM:SSZ)'}), 400

    rows_updated = execute_db(
        'UPDATE tasks SET title = ?, description = ?, due_datetime = ?, completed = ? WHERE id = ?',
        (title, description, due_datetime, completed, task_id)
    )
    if rows_updated == None:
        return jsonify({'error': 'Task not found'}), 404

    task = query_db('SELECT id, title, description, due_datetime, completed FROM tasks WHERE id = ?', [task_id], one=True)
    return jsonify(dict(task))

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Deletes a specific task."""
    rows_deleted = execute_db('DELETE FROM tasks WHERE id = ?', [task_id])
    if rows_deleted == None:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify({'message': 'Task deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
