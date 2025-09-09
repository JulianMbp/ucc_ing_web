// importa React y useState
import React, { useState } from "react";

// componente conversor Celsius -> Fahrenheit
const UnitConverter: React.FC = () => {
  const [celsius, setCelsius] = useState<string>(""); // estado para input Celsius
  const [fahrenheit, setFahrenheit] = useState<string>(""); // estado para resultado Fahrenheit

  // función que realiza la conversión y guarda el resultado formateado
  const handleConvert = () => {
    const c = Number(celsius); // parsea a número
    setFahrenheit(((c * 1.8) + 32).toFixed(2)); // calcula y formatea a 2 decimales
  };

  // render del componente con controles y resultado
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8">{/* contenedor */}
      <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300 text-center">Conversor de Unidades</h2>
      <div className="flex gap-2 mb-4">{/* fila con input y botón */}
        <input
          type="number" // input numérico para Celsius
          value={celsius} // valor controlado
          onChange={e => setCelsius(e.target.value)} // actualiza estado al escribir
          placeholder="Celsius" // placeholder
          data-testid="input-celsius" // id para tests
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-700 dark:text-white"
        />
        <button
          onClick={handleConvert} // al hacer clic convierte
          data-testid="convert-btn" // id para tests
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Convertir
        </button>
      </div>
      <div className="flex gap-2 items-center">{/* fila con resultado */}
        <input
          type="text" // campo de solo lectura para Fahrenheit
          value={fahrenheit} // muestra el resultado
          readOnly // evita edición manual
          placeholder="Fahrenheit" // placeholder
          data-testid="input-fahrenheit" // id para tests
          className="flex-1 px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-white"
        />
        <span className="text-slate-500 dark:text-slate-300">°F</span> {/* etiqueta unidad */}
      </div>
    </div>
  );
};

export default UnitConverter; // exporta el componente
