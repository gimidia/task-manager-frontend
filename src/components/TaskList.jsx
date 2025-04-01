import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [filter, setFilter] = useState("");

  const statusMap = {
    0: "Pendente",
    1: "Em Progresso",
    2: "Concluída",
  };

  const filteredTasks = filter ? tasks.filter(task => task.status == filter) : tasks;

  return (
    <div>
      <h2>Lista de Tarefas</h2>

      <label>Filtrar por status:</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">Todas</option>
        <option value="0">Pendente</option>
        <option value="1">Em Progresso</option>
        <option value="2">Concluída</option>
      </select>

      <ul>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} statusMap={statusMap} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
