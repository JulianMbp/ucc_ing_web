import React, { useState } from "react";

const UnitConverter: React.FC = () => {
  const [celsius, setCelsius] = useState<string>("");
  const [fahrenheit, setFahrenheit] = useState<string>("");

  const handleConvert = () => {
    const c = Number(celsius);
    setFahrenheit(((c * 1.8) + 32).toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300 text-center">Conversor de Unidades</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={celsius}
          onChange={e => setCelsius(e.target.value)}
          placeholder="Celsius"
          data-testid="input-celsius"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-700 dark:text-white"
        />
        <button
          onClick={handleConvert}
          data-testid="convert-btn"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Convertir
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={fahrenheit}
          readOnly
          placeholder="Fahrenheit"
          data-testid="input-fahrenheit"
          className="flex-1 px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-white"
        />
        <span className="text-slate-500 dark:text-slate-300">°F</span>
      </div>
    </div>
  );
};

export default UnitConverter;
