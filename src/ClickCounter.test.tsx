import { fireEvent, render, screen } from "@testing-library/react";
import ClickCounter from "./components/ClickCounter";

// Suite de pruebas para ClickCounter
describe("ClickCounter", () => {
  // beforeEach se ejecuta antes de cada test para dejar el entorno limpio
  beforeEach(() => {
    // Limpiamos el localStorage mock para evitar interferencias entre tests
    localStorage.clear();
    // Restauramos mocks en caso de que algún test anterior los haya sobrescrito
    jest.restoreAllMocks();
  });

  // Test 1: si no hay valor en localStorage, el contador debe iniciar en 0
  test("inicia en 0 si no hay valor en localStorage", () => {
    render(<ClickCounter />); // montamos el componente
    // Verificamos que el elemento con data-testid="counter-value" muestre "0"
    expect(screen.getByTestId("counter-value")).toHaveTextContent("0");
  });

  // Test 2: al hacer click el contador aumenta y el valor se persiste en localStorage
  test("incrementa el contador y guarda en localStorage", () => {
    render(<ClickCounter />); // montamos el componente
    const btn = screen.getByTestId("counter-btn"); // localizamos el botón

    // Simulamos un click; handleClick incrementa el contador y guarda en localStorage
    fireEvent.click(btn);
    // Verificamos que el texto del contador se actualizó a "1"
    expect(screen.getByTestId("counter-value")).toHaveTextContent("1");

    // Comprobamos que el mock de localStorage guardó el nuevo valor
    expect(window.localStorage.getItem("click_counter")).toBe("1");

    // Otro click: contador a 2 y persistencia a "2"
    fireEvent.click(btn);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("2");
    expect(window.localStorage.getItem("click_counter")).toBe("2");
  });

  // Test 3: si hay un valor en localStorage antes de montar, el componente lo carga
  test("carga el valor guardado en localStorage al renderizar", () => {
    // Pre-cargamos el mock de localStorage con "5"
    window.localStorage.setItem("click_counter", "5");
    // Montamos el componente; useEffect leerá localStorage y asignará el estado
    render(<ClickCounter />);
    // Verificamos que el contador muestra el valor cargado (5)
    expect(screen.getByTestId("counter-value")).toHaveTextContent("5");
  });
});
