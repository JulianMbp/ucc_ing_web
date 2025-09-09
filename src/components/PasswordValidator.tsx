// importa React y useState
import React, { useState } from "react";

// lista de requisitos a validar con su función de prueba
const requirements = [
  {
    label: "Al menos 8 caracteres", // etiqueta mostrada
    test: (pw: string) => pw.length >= 8, // chequeo de longitud
  },
  {
    label: "Contiene un número",
    test: (pw: string) => /\d/.test(pw), // verifica dígitos
  },
  {
    label: "Contiene una letra mayúscula",
    test: (pw: string) => /[A-Z]/.test(pw), // verifica mayúsculas
  },
];

// componente principal del validador
const PasswordValidator: React.FC = () => {
  const [password, setPassword] = useState(""); // estado para la contraseña

  const metRequirements = requirements.map(r => r.test(password)); // array booleana de requisitos cumplidos
  const allValid = metRequirements.every(Boolean); // true si todos los requisitos se cumplen

  // render con estilos y lógica
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8">{/* contenedor */}
      <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300 text-center">Validador de Contraseñas</h2>
      {/* input controlado para la contraseña */}
      <input
        type="text"
        value={password} // valor controlado
        onChange={e => setPassword(e.target.value)} // actualiza estado al escribir
        placeholder="Contraseña"
        data-testid="input-password" // id para tests
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 mb-4 dark:bg-slate-700 dark:text-white"
      />
      {/* lista de requisitos con clases que dependen de si se cumplen */}
      <ul data-testid="requirements-list" className="mb-4 space-y-2">
        {requirements.map((r, idx) => (
          <li
            key={r.label} // clave única
            data-testid={`req-${idx}`} // id para tests
            className={`px-3 py-1 rounded ${metRequirements[idx] ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"}`} // clase condicional
          >
            {r.label} {/* muestra el texto del requisito */}
          </li>
        ))}
      </ul>
      {/* mensaje final que aparece cuando todos los requisitos se cumplen */}
      {allValid && (
        <div data-testid="valid-msg" className="text-green-700 dark:text-green-300 font-semibold text-center">Contraseña válida</div>
      )}
    </div>
  );
};

export default PasswordValidator; // exporta componente
