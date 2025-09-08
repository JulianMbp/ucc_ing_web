import React, { useState } from "react";

// Definimos la forma de una tarea en TypeScript
interface Task {
  id: number; // identificador único de la tarea (aquí usamos Date.now())
  text: string; // texto/descripcion de la tarea
}

// Componente principal de la lista de tareas
const TodoList: React.FC = () => {
  // Estado que almacena las tareas actuales (array de Task)
  const [tasks, setTasks] = useState<Task[]>([]);

  // Estado controlado para el input donde se escribe la nueva tarea
  const [input, setInput] = useState("");

  // handleAdd: se llama al pulsar "Agregar"
  // - si el input no está vacío (trim elimina espacios), añadimos una nueva tarea
  // - usamos Date.now() como id simple y limpiamos el input
  const handleAdd = () => {
    if (input.trim()) {
      setTasks(prev => [...prev, { id: Date.now(), text: input.trim() }]);
      setInput("");
    }
  };

  // handleDelete: elimina una tarea por su id
  const handleDelete = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Render del componente (JSX)
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8">
      {/* Título de la sección */}
      <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300 text-center">Lista de Tareas</h2>

      {/* Controles: input y botón Agregar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          // value enlazado con el estado `input` (componente controlado)
          value={input}
          // onChange actualiza el estado con el valor actual del input
          onChange={e => setInput(e.target.value)}
          placeholder="Nueva tarea"
          data-testid="input-task" // usado por los tests para localizar el input
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-700 dark:text-white"
        />

        <button
          // Al pulsar llamamos a handleAdd
          onClick={handleAdd}
          data-testid="add-btn" // usado por tests para localizar el botón
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Agregar
        </button>
      </div>

      {/* Lista de tareas: si no hay tareas mostramos un mensaje, si hay tareas mapeamos */}
      <ul data-testid="tasks-list" className="space-y-2">
        {tasks.length === 0 ? (
          // Mensaje cuando la lista está vacía
          <li data-testid="empty-msg" className="text-slate-500 dark:text-slate-400 text-center">No hay tareas</li>
        ) : (
          // Mapeamos cada tarea a un <li>
          tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 rounded px-3 py-2">
              {/* Texto de la tarea */}
              <span className="text-slate-700 dark:text-slate-200">{task.text}</span>

              {/* Botón eliminar: llama a handleDelete con el id de la tarea */}
              <button
                onClick={() => handleDelete(task.id)}
                data-testid={`delete-btn-${task.id}`} // testId único por tarea
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
