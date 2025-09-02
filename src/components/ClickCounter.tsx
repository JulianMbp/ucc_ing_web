import React, { useEffect, useState } from "react";

const LOCAL_KEY = "click_counter";

const ClickCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved !== null) {
      setCount(Number(saved));
    }
  }, []);

  const handleClick = () => {
    setCount(prev => {
      const newCount = prev + 1;
      localStorage.setItem(LOCAL_KEY, String(newCount));
      return newCount;
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300">Contador de Clics</h2>
      <div data-testid="counter-value" className="text-4xl font-bold mb-4 text-emerald-600 dark:text-emerald-300">{count}</div>
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
