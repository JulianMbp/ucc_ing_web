import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      setTasks(prev => [...prev, { id: Date.now(), text: input.trim() }]);
      setInput("");
    }
  };

  const handleDelete = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300 text-center">Lista de Tareas</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nueva tarea"
          data-testid="input-task"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-700 dark:text-white"
        />
        <button
          onClick={handleAdd}
          data-testid="add-btn"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Agregar
        </button>
      </div>
      <ul data-testid="tasks-list" className="space-y-2">
        {tasks.length === 0 ? (
          <li data-testid="empty-msg" className="text-slate-500 dark:text-slate-400 text-center">No hay tareas</li>
        ) : (
          tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 rounded px-3 py-2">
              <span className="text-slate-700 dark:text-slate-200">{task.text}</span>
              <button
                onClick={() => handleDelete(task.id)}
                data-testid={`delete-btn-${task.id}`}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
