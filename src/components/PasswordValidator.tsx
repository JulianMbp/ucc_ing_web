import React, { useState } from "react";

const requirements = [
  {
    label: "Al menos 8 caracteres",
    test: (pw: string) => pw.length >= 8,
  },
  {
    label: "Contiene un número",
    test: (pw: string) => /\d/.test(pw),
  },
  {
    label: "Contiene una letra mayúscula",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
];

const PasswordValidator: React.FC = () => {
  const [password, setPassword] = useState("");

  const metRequirements = requirements.map(r => r.test(password));
  const allValid = metRequirements.every(Boolean);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300 text-center">Validador de Contraseñas</h2>
      <input
        type="text"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
        data-testid="input-password"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 mb-4 dark:bg-slate-700 dark:text-white"
      />
      <ul data-testid="requirements-list" className="mb-4 space-y-2">
        {requirements.map((r, idx) => (
          <li
            key={r.label}
            data-testid={`req-${idx}`}
            className={`px-3 py-1 rounded ${metRequirements[idx] ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"}`}
          >
            {r.label}
          </li>
        ))}
      </ul>
      {allValid && (
        <div data-testid="valid-msg" className="text-green-700 dark:text-green-300 font-semibold text-center">Contraseña válida</div>
      )}
    </div>
  );
};

export default PasswordValidator;
