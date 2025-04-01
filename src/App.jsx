import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./styles.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5048/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const handleSaveTask = async (task) => {
    if (task.id) {
      await fetch(`http://localhost:5048/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
    } else {
      await fetch("http://localhost:5048/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
    }
    fetchTasks();
    setEditingTask(null);
  };

  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:5048/api/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Gerenciador de Tarefas</h1>
      <TaskForm onSave={handleSaveTask} editingTask={editingTask} />
      <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default App;
