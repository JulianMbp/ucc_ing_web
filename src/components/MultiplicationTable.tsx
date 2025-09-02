import React, { useState } from "react";

const MultiplicationTable: React.FC = () => {
  const [number, setNumber] = useState<number | "">("");
  const [table, setTable] = useState<number[]>([]);

  const handleGenerate = () => {
    if (number !== "") {
      const n = Number(number);
      setTable(Array.from({ length: 10 }, (_, i) => n * (i + 1)));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300 text-center">Tabla de Multiplicar</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={number}
          onChange={e => setNumber(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Ingrese un número"
          data-testid="input-number"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-700 dark:text-white"
        />
        <button
          onClick={handleGenerate}
          data-testid="generate-btn"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Generar
        </button>
      </div>
      <ul data-testid="table-list" className="space-y-2">
        {table.map((value, idx) => (
          <li key={idx} className="bg-emerald-50 dark:bg-emerald-900/30 rounded px-3 py-1 text-slate-700 dark:text-slate-200">
            {`${number} x ${idx + 1} = ${value}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiplicationTable;
