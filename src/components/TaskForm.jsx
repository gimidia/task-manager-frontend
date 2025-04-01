// TaskForm.jsx
import React, { useState, useEffect } from "react";

const TaskForm = ({ onSave, editingTask }) => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("0");
    const [dataConclusao, setDataConclusao] = useState("");

    useEffect(() => {
        if (editingTask) {
            setTitulo(editingTask.titulo);
            setDescricao(editingTask.descricao);
            setStatus(editingTask.status.toString());
            setDataConclusao(editingTask.dataConclusao ? formatDateForInput(editingTask.dataConclusao) : "");
        } else {
            setDataConclusao("");
        }
    }, [editingTask]);

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            id: editingTask?.id,
            titulo,
            descricao,
            status: parseInt(status),
        };
        if (dataConclusao) {
            taskData.dataConclusao = new Date(dataConclusao).toISOString().split('T')[0];
        } else {
            taskData.dataConclusao = null;
        }
        onSave(taskData);
        setTitulo("");
        setDescricao("");
        setStatus("0");
        setDataConclusao("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{editingTask ? "Editar Tarefa" : "Criar Tarefa"}</h2>
            <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="0">Pendente</option>
                <option value="1">Em Progresso</option>
                <option value="2">Concluída</option>
            </select>
            <div className="form-group">
                <label htmlFor="dataConclusao">Data de Conclusão (Opcional):</label>
                <input
                    type="date"
                    id="dataConclusao"
                    value={dataConclusao}
                    onChange={(e) => setDataConclusao(e.target.value)}
                />
            </div>
            <button type="submit">{editingTask ? "Atualizar" : "Criar"}</button>
        </form>
    );
};

export default TaskForm;