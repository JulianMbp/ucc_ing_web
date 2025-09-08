# Pruebas unitarias — Proyecto UCC (Explicación)

Este README describe qué hace cada componente y cada prueba (`test`) incluida en el proyecto. Está escrito en español y explica las líneas más importantes de los tests y del código para que puedas entender qué se verificó y por qué.

## Cómo ejecutar las pruebas

En la raíz del proyecto (donde está `package.json`) ejecuta:

```powershell
npm install
npm test
```

El proyecto usa Jest con `@testing-library/react` para pruebas de componentes React.

## Resumen de cambios realizados para que los tests pasen

- `src/setupTests.ts`: Se añadió un polyfill para `TextEncoder`/`TextDecoder`, un mock funcional en-memory para `window.localStorage` (antes el mock devolvía siempre `null`) y un mock simple para `window.matchMedia` y `document.documentElement` usado por el tema. Esto permite que los tests que leen/escriben en `localStorage` y el código que consulta `matchMedia` funcionen en el entorno de Jest.
- Se agregaron tests mínimos en `src/components/Sidebar.test.tsx` y `src/components/Layout.test.tsx` (estaban vacíos) para que esas suites contengan al menos una prueba.

## Librerías usadas en los tests

- jest
- @testing-library/react

Estas permiten renderizar los componentes en un DOM simulado, disparar eventos y usar matchers como `toBeInTheDocument`.

---

## Descripción por componente y por fichero de test
Para cada test describo qué comprueba (objetivo), y explico las líneas clave del test y las líneas relevantes del componente.

### 1) MultiplicationTable
- Archivo del componente: `src/components/MultiplicationTable.tsx`
  - Qué hace: muestra un input numérico y un botón. Al pulsar "Generar" crea una lista con la tabla de multiplicar del número (del 1 al 10).
  - Líneas clave del componente:
    - useState para `number` y `table`: guarda el número ingresado y el arreglo de resultados.
    - `handleGenerate`: transforma el número en Number y genera `Array.from({length: 10}, (_, i) => n * (i+1))`.
    - Render: input tipo `number` con `data-testid="input-number"`, botón `data-testid="generate-btn"`, lista `ul` con `table.map(...)`.


  - Desglose línea a línea (test):
    1. `import { fireEvent, render, screen } from "@testing-library/react";` — trae utilidades para renderizar y simular eventos.
    2. `import MultiplicationTable from "./components/MultiplicationTable";` — importa el componente bajo prueba.
    3. `render(<MultiplicationTable />);` — monta el componente en un DOM virtual (jsdom).
    4. `expect(screen.getByText(/Tabla de Multiplicar/i)).toBeInTheDocument();` — busca el título y asume que se renderizó correctamente.
    5. `fireEvent.change(screen.getByTestId("input-number"), { target: { value: "5" } });` — simula que el usuario teclea "5"; activa onChange y actualiza el state `number`.
    6. `fireEvent.click(screen.getByTestId("generate-btn"));` — simula el click que llama a `handleGenerate`; este crea el array `table`.
    7. `const items = screen.getAllByRole("listitem");` — obtiene los elementos de la lista generada.
    8. `expect(items).toHaveLength(10);` — comprueba que hay 10 elementos (del 1 al 10).
    9. `expect(items[0]).toHaveTextContent("5 x 1 = 5");` y `expect(items[9]).toHaveTextContent("5 x 10 = 50");` — verifican los textos exactos.

  - Comentario sobre por qué funciona:
    - El test es determinista porque el componente usa números y operaciones sin efectos asíncronos.
    - El input usa `data-testid` para localizarlo de forma robusta. `fireEvent.change` actualiza el value que el componente recibe en su onChange.

- Archivo de test: `src/MultiplicationTable.test.tsx`
    1. Verificar que el título y los controles se renderizan.
    2. Al ingresar un número y pulsar, se generan 10 items con el contenido correcto (por ejemplo "5 x 1 = 5").
    3. Al cambiar el número y pulsar de nuevo, la tabla se actualiza.
  - Explicación de las líneas clave del test:
    - import y render: `render(<MultiplicationTable />)` crea el componente en el DOM de prueba.
    - `fireEvent.change(screen.getByTestId("input-number"), { target: { value: "5" } })`: simula escribir "5" en el input. `fireEvent.change` cambia el value en el DOM y activa el onChange.
    - `screen.getAllByRole("listitem")`: obtiene los 10 elementos `li` generados.
    - Asserts: `.toHaveLength(10)` y comprobaciones puntuales del contenido del primer y último item.

### 2) UnitConverter
- Archivo del componente: `src/components/UnitConverter.tsx`
  - Qué hace: conversor simple Celsius -> Fahrenheit. Tiene un input para Celsius (`data-testid="input-celsius"`), un botón `convert-btn` y un input readOnly `input-fahrenheit`.
  - Líneas clave del componente:

  - Desglose línea a línea (test):
    1. `import { fireEvent, render, screen } from "@testing-library/react";` — utilidades de prueba.
    2. `import PasswordValidator from "./components/PasswordValidator";` — componente bajo prueba.
    3. `render(<PasswordValidator />);` — monta el componente.
    4. `const input = screen.getByTestId("input-password");` — localiza el campo de contraseña.
    5. `fireEvent.change(input, { target: { value: "hola" } });` — escribe "hola" (4 letras, no cumple requisitos de número ni mayúscula, ni longitud 8).
    6. `expect(screen.getByTestId("req-0").className).toContain("bg-red-100");` — verifica que el requisito 0 (8 caracteres) está en rojo.
    7. `expect(screen.getByTestId("req-1").className).toContain("bg-red-100");` — requisito número también en rojo.
    8. `expect(screen.getByTestId("req-2").className).toContain("bg-red-100");` — requisito de mayúscula en rojo.
    9. `fireEvent.change(input, { target: { value: "holamundo1" } });` — ahora la cadena tiene longitud >=8 y un número; se espera que `req-0` y `req-1` sean verdes.
   10. `expect(screen.getByTestId("req-0").className).toContain("bg-green-100");` — longitud cumplida.
   11. `expect(screen.getByTestId("req-1").className).toContain("bg-green-100");` — contiene número.
   12. `fireEvent.change(input, { target: { value: "Holamundo1" } });` — añade una mayúscula: ahora todos deben ser verdes.
   13. `expect(screen.getByTestId("req-2").className).toContain("bg-green-100");` — requisito de mayúscula cumplido.
   14. `expect(screen.getByTestId("valid-msg")).toBeInTheDocument();` — al cumplir todos se muestra el mensaje de contraseña válida.

  - Comentario sobre por qué funciona:
    - El componente evalúa los requisitos en cada render usando `requirements.map(r => r.test(password))`.
    - Los tests verifican el efecto visual (clases CSS) porque el componente usa clases condicionales para marcar cumplido/no cumplido.

    - `handleConvert`: convierte `c` con la fórmula `F = C * 1.8 + 32` y guarda el resultado con `toFixed(2)`.
- Archivo de test: `src/UnitConverter.test.tsx`
  - Objetivos del test:
    1. Verificar que el formulario se renderiza.
    2. Probar conversiones con 0, 100 y -40 para verificar positivos, cero y negativos.
    - `fireEvent.change(..., { target: { value: "0" } })` seguido de `fireEvent.click(convert-btn)` para activar la conversión.
    - `expect(screen.getByTestId("input-fahrenheit")).toHaveValue("32.00")` comprueba que el input readOnly contiene el string formateado a dos decimales.

### 3) PasswordValidator
- Archivo del componente: `src/components/PasswordValidator.tsx`
  - Qué hace: muestra un input de contraseña y una lista de requisitos. A medida que el usuario escribe, cada requisito se evalúa y cambia su clase (verde si se cumple, rojo si no). Si todos se cumplen, muestra "Contraseña válida".

  - Desglose línea a línea (test):
    1. `import { fireEvent, render, screen } from "@testing-library/react";` — utilidades de testing.
    2. `import UnitConverter from "./components/UnitConverter";` — componente bajo prueba.
    3. `render(<UnitConverter />);` — monta el componente.
    4. `fireEvent.change(screen.getByTestId("input-celsius"), { target: { value: "0" } });` — simula ingresar 0°C.
    5. `fireEvent.click(screen.getByTestId("convert-btn"));` — ejecuta la conversión.
    6. `expect(screen.getByTestId("input-fahrenheit")).toHaveValue("32.00");` — verifica el resultado con dos decimales.
    7. Repetir con `100` y `-40` para cubrir casos límite y signo negativo.

  - Comentario sobre por qué funciona:
    - El componente usa `Number(celsius)` para parsear y `toFixed(2)` para formatear, por eso las expectativas comparan strings exactos como "32.00".

  - Requisitos implementados:
    - Contiene un número (regex \d)
    - Contiene una letra mayúscula (regex [A-Z])

- Archivo de test: `src/PasswordValidator.test.tsx`
  - Objetivos del test:
    2. Cambiar el input y comprobar las clases de los elementos `req-0`, `req-1`, `req-2` para ver si pasan a `bg-green-100` o `bg-red-100`.
    3. Comprobar que al cumplir todos los requisitos aparece el `data-testid="valid-msg"`.
  - Explicación de las líneas clave del test:
    - `fireEvent.change(input, { target: { value: "hola" } })` y después `expect(...).className.toContain("bg-red-100")`: verifica el estado inicial no válido.
    - Cambios sucesivos en el input con contraseñas que satisfacen parcialmente o totalmente los requisitos y comprobaciones de clase.

### 4) ClickCounter
- Archivo del componente: `src/components/ClickCounter.tsx`
  - Qué hace: muestra un contador y un botón. Al hacer click incrementa el contador y guarda el valor en `localStorage` usando la clave `click_counter`. En `useEffect` al montar el componente lee `localStorage` y si hay un valor lo carga en el estado.

  - Desglose línea a línea (test):
    1. `beforeEach(() => { localStorage.clear(); jest.restoreAllMocks(); });` — limpia el mock y restaura estados previos para pruebas aisladas.
    2. `render(<ClickCounter />);` — monta el componente; internamente el `useEffect` intenta leer `localStorage` y cargar `count`.
    3. `expect(screen.getByTestId("counter-value")).toHaveTextContent("0");` — garantiza estado inicial cuando no hay valor guardado.
    4. `const btn = screen.getByTestId("counter-btn");` — localiza el botón.
    5. `fireEvent.click(btn);` — simula un clic; la función `handleClick` ejecuta `setCount(prev => ...)` y `localStorage.setItem(...)`.
    6. `expect(screen.getByTestId("counter-value")).toHaveTextContent("1");` — verifica incremento.
    7. `expect(window.localStorage.getItem("click_counter")).toBe("1");` — lee directamente del mock de `localStorage` y verifica persistencia.
    8. `window.localStorage.setItem("click_counter", "5"); render(<ClickCounter />); expect(screen.getByTestId("counter-value")).toHaveTextContent("5")` — simula recarga al pre-cargar `localStorage` y re-montar el componente.

  - Comentario sobre por qué funciona:
    - La clave fue que `setupTests.ts` proveyera un mock de `localStorage` con comportamiento realista en memoria: `getItem` devuelve lo que `setItem` guardó. Sin esto, `useEffect` siempre veía `null`.
  - Líneas clave del componente:
    - `useEffect` que hace `const saved = localStorage.getItem(LOCAL_KEY); if (saved !== null) setCount(Number(saved));`
    - `handleClick` que aumenta el contador con `setCount(prev => { const newCount = prev + 1; localStorage.setItem(LOCAL_KEY, String(newCount)); return newCount; })`.

- Archivo de test: `src/ClickCounter.test.tsx`
  - Objetivos del test:
    1. Si no hay valor en `localStorage`, el contador inicia en 0.
    2. Al hacer click, el contador incrementa y el valor se guarda en `localStorage`.
    3. Simular una recarga (pre-popular `localStorage` y volver a renderizar) y verificar que el contador carga desde `localStorage`.
  - Explicación de las líneas clave del test:
    - En `beforeEach` se limpia `localStorage` (`localStorage.clear()`) y se restaura mocks.
    - Después de un `fireEvent.click(btn)` se espera `screen.getByTestId("counter-value").toHaveTextContent("1")` y `expect(window.localStorage.getItem("click_counter")).toBe("1")` verifica persistencia.
    - Para la comprobación de carga desde `localStorage` se hace `window.localStorage.setItem("click_counter", "5")` y luego `render(<ClickCounter />)` y se espera `toHaveTextContent("5")`.
  - Nota sobre el fallo original y la corrección: el mock de `localStorage` en `setupTests.ts` devolvía siempre `null` en `getItem`, por eso las pruebas que esperan persistencia fallaban. Se reemplazó por un mock en-memory que permite `getItem`/`setItem` y el test pasó.

### 5) TodoList
- Archivo del componente: `src/components/TodoList.tsx`
  - Qué hace: permite agregar tareas desde un input y cada tarea tiene un botón "Eliminar" que borra la tarea de la lista.
  - Líneas clave del componente:
    - Estado `tasks: Task[]` y `input`.
    - `handleAdd` que agrega `{ id: Date.now(), text: input.trim() }` si el texto no está vacío.
    - `handleDelete` que filtra la tarea por id.

- Archivo de test: `src/TodoList.test.tsx`
  - Objetivos del test:
    1. Verificar que el input y botón para agregar están presentes.
    2. Agregar una tarea y comprobar que aparece en la lista.
    3. Eliminar la tarea y comprobar que desaparece.
    4. Comprobar el mensaje `No hay tareas` cuando la lista está vacía y la lista cuando hay varias tareas.
  - Explicación de las líneas clave del test:
    - `fireEvent.change(screen.getByTestId("input-task"), { target: { value: "Estudiar" } })` y `fireEvent.click(screen.getByTestId("add-btn"))` crea la tarea.
    - `screen.queryByText("Tarea 1")` se utiliza para verificar que la tarea fue eliminada (`not.toBeInTheDocument`).

### Tests añadidos para Layout y Sidebar
- `src/components/Sidebar.test.tsx`: renderiza el `Sidebar` dentro de `MemoryRouter` y comprueba la presencia de enlaces/textos conocidos como "Tabla de Multiplicar" y "Conversor de Unidades".
- `src/components/Layout.test.tsx`: renderiza `Layout` dentro de rutas simuladas y comprueba que contiene el `Navbar` (busca el texto de marca) y renderiza el `Outlet` con contenido "Home Content".

## Qué es el código vs qué son los tests

- Código (componentes): implementa la UI y la lógica de cada página/componente. Está pensado para ejecutarse en un navegador real.
- Tests: son pequeños programas que ejecutan los componentes en un DOM simulado (jsdom) y verifican comportamientos mediante aserciones. Usan patrones como: render -> interactuar -> afirmar.

Ejemplo de flujo en un test típico:
1. renderizar el componente en el entorno de prueba (`render(<Componente />)`).
2. localizar nodos relevantes (`screen.getByTestId`, `getByText`, `getAllByRole`).
3. simular acciones del usuario (`fireEvent.click`, `fireEvent.change`).
4. hacer aserciones sobre el DOM resultante (`expect(...).toBeInTheDocument()`, `toHaveTextContent`, `toHaveValue`).

---

Si quieres, puedo:
- Añadir comentarios *inline* (línea por línea) dentro de los archivos de test para que queden explicaciones justo al lado de cada línea.
- Generar un documento más detallado que describa literalmente cada línea de cada archivo (más verboso).

Indica si prefieres la explicación inline o la versión más extensa y la creo.

---

Fin del README.
