import React from "react";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const TaskItem = ({ task, statusMap, onEdit, onDelete }) => {
    const timeZone = 'America/Sao_Paulo'; // Defina o fuso horário do Brasil

    return (
        <li className="task-item">
            <div className="task-info-container">
                <strong>{task.titulo}</strong> - {statusMap[task.status]}
                {task.dataCriacao && (
                    <span className="task-date">
                        Criado em: {format(parseISO(task.dataCriacao), 'dd/MM/yyyy', { locale: ptBR, timeZone })}
                    </span>
                )}
                {task.dataConclusao && (
                    <span className="task-date">
                        Concluído em: {format(parseISO(task.dataConclusao), 'dd/MM/yyyy', { locale: ptBR, timeZone })}
                    </span>
                )}
            </div>
            <div className="task-actions">
                <button onClick={() => onEdit(task)}>Editar</button>
                <button onClick={() => onDelete(task.id)}>Excluir</button>
            </div>
        </li>
    );
};

export default TaskItem;