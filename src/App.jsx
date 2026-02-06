import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
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
    let newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task.id === id) {
        let newTask = { ...task, completed: !task.completed };
        newTasks.push(newTask);
      } else {
        newTasks.push(task);
      }
    }
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const saveTask = () => {
    let trimmedText = editingText.trim();
    if (!trimmedText) return;
    let newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task.id === editingTaskId) {
        let newTask = { ...task, text: trimmedText };
        newTasks.push(newTask);
      } else {
        newTasks.push(task);
      }
    }
    setTasks(newTasks);
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

  let filteredTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let shouldInclude = false;
    if (filter === "active") {
      if (!task.completed) {
        shouldInclude = true;
      }
    } else if (filter === "completed") {
      if (task.completed) {
        shouldInclude = true;
      }
    } else {
      shouldInclude = true;
    }
    if (shouldInclude) {
      filteredTasks.push(task);
    }
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>Task Manager</h1>
      </div>
      
      <TaskForm onAdd={addTask} />
      
      <FilterBar 
        currentFilter={filter} 
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
      />
      
      <TaskList
        tasks={filteredTasks}
        editingTaskId={editingTaskId}
        editingText={editingText}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onStartEdit={startEdit}
        onSaveEdit={saveTask}
        onCancelEdit={cancelEdit}
        onEditTextChange={setEditingText}
      />
      
      <div className="app-footer">Active tasks: {activeCount}</div>
    </div>
  );
}

export default App;
