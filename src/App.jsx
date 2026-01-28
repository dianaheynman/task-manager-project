import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import "./App.css";


function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        return JSON.parse(storedTasks);
      } catch (error) {
        console.error("Failed to parse stored tasks:", error);
        return [];
      }
    }
    return [];
  });
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const saveTask = () => {
    const trimmedText = editingText.trim();
    if (!trimmedText) return;
    setTasks(tasks.map(task =>
      task.id === editingTaskId ? { ...task, text: trimmedText } : task
    ));
    setEditingTaskId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingText("");
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const activeCount = tasks.filter(task => !task.completed).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={saveTask}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                {task.text}
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>Active tasks: {activeCount}</div>
    </div>
  );
}

export default App;
