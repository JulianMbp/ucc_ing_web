// importa React y el hook useState
import React, { useState } from "react";

// componente que muestra la tabla de multiplicar
const MultiplicationTable: React.FC = () => {
  // estado para el número ingresado (puede ser vacío)
  const [number, setNumber] = useState<number | "">("");
  // estado para la lista con los resultados de la tabla
  const [table, setTable] = useState<number[]>([]);

  // genera la tabla del número actual (1..10)
  const handleGenerate = () => {
    if (number !== "") {
      const n = Number(number); // asegura que sea número
      setTable(Array.from({ length: 10 }, (_, i) => n * (i + 1))); // calcula resultado
    }
  };

  // render del componente con estilos Tailwind
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8">{/* contenedor */}
      {/* título */}
      <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300 text-center">Tabla de Multiplicar</h2>
      {/* controles: input + botón */}
      <div className="flex gap-2 mb-4">
        {/* input numérico */}
        <input
          type="number" // tipo numérico
          value={number} // valor controlado
          onChange={e => setNumber(e.target.value === "" ? "" : Number(e.target.value))} // actualiza estado
          placeholder="Ingrese un número" // ayuda al usuario
          data-testid="input-number" // id para tests
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-700 dark:text-white"
        />
        {/* botón para generar */}
        <button
          onClick={handleGenerate} // invoca generación
          data-testid="generate-btn" // id para tests
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Generar
        </button>
      </div>
      {/* listado de resultados */}
      <ul data-testid="table-list" className="space-y-2">
        {table.map((value, idx) => (
          // cada fila muestra la multiplicación
          <li key={idx} className="bg-emerald-50 dark:bg-emerald-900/30 rounded px-3 py-1 text-slate-700 dark:text-slate-200">
            {`${number} x ${idx + 1} = ${value}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiplicationTable; // exporta el componente
