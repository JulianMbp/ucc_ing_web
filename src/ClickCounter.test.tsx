import { fireEvent, render, screen } from "@testing-library/react";
import ClickCounter from "./components/ClickCounter";

describe("ClickCounter", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test("inicia en 0 si no hay valor en localStorage", () => {
    render(<ClickCounter />);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("0");
  });

  test("incrementa el contador y guarda en localStorage", () => {
    render(<ClickCounter />);
    const btn = screen.getByTestId("counter-btn");
    fireEvent.click(btn);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("1");
    // El valor puede no actualizarse instantáneamente en Jest, así que forzamos la lectura
    expect(window.localStorage.getItem("click_counter")).toBe("1");
    fireEvent.click(btn);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("2");
    expect(window.localStorage.getItem("click_counter")).toBe("2");
  });

  test("carga el valor guardado en localStorage al renderizar", () => {
    window.localStorage.setItem("click_counter", "5");
    // Forzamos un nuevo render para simular recarga
    render(<ClickCounter />);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("5");
  });
});
