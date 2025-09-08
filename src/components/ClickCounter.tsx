import React, { useEffect, useState } from "react";

// Clave usada en localStorage para persistir el contador
const LOCAL_KEY = "click_counter";

const ClickCounter: React.FC = () => {
  // Estado local que guarda el contador
  const [count, setCount] = useState<number>(0);

  // useEffect con arreglo de dependencias vacío: se ejecuta solo al montar el componente
  // Intenta leer un valor previo guardado en localStorage y, si existe, lo carga en el estado
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY); // puede devolver null si no hay valor
    if (saved !== null) {
      // Convertimos a número y actualizamos el estado
      setCount(Number(saved));
    }
  }, []);

  // handleClick: incrementa el contador y persiste el nuevo valor en localStorage
  const handleClick = () => {
    setCount(prev => {
      const newCount = prev + 1;
      // Guardamos el nuevo valor como string en localStorage
      localStorage.setItem(LOCAL_KEY, String(newCount));
      return newCount; // actualiza el estado con el nuevo valor
    });
  };

  // JSX de presentación
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8 text-center">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300">Contador de Clics</h2>

      {/* Muestra el valor actual del contador; data-testid usado por tests */}
      <div data-testid="counter-value" className="text-4xl font-bold mb-4 text-emerald-600 dark:text-emerald-300">{count}</div>

      {/* Botón que dispara handleClick */}
      <button
        onClick={handleClick}
        data-testid="counter-btn"
        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-lg"
      >
        Clic
      </button>
    </div>
  );
};

export default ClickCounter;
