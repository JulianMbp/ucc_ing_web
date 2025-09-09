import { fireEvent, render, screen } from "@testing-library/react"; // importa utilidades de testing
import PasswordValidator from "./components/PasswordValidator"; // importa componente

describe("PasswordValidator", () => { // agrupa pruebas del validador
  test("renderiza campos y requisitos", () => { // prueba render básico
    render(<PasswordValidator />); // renderiza componente
    expect(screen.getByText(/Validador de Contraseñas/i)).toBeInTheDocument(); // valida título
    expect(screen.getByTestId("input-password")).toBeInTheDocument(); // valida input
    expect(screen.getByTestId("requirements-list")).toBeInTheDocument(); // valida lista de requisitos
  });

  test("actualiza requisitos según la contraseña", () => { // prueba comportamiento dinámico
  render(<PasswordValidator />); // renderiza componente
  const input = screen.getByTestId("input-password"); // obtiene input por testid
  fireEvent.change(input, { target: { value: "hola" } }); // simula escribir "hola"
  // Deben estar en rojo (clase bg-red-100)
  expect(screen.getByTestId("req-0").className).toContain("bg-red-100"); // requisito 0 en rojo
  expect(screen.getByTestId("req-1").className).toContain("bg-red-100"); // requisito 1 en rojo
  expect(screen.getByTestId("req-2").className).toContain("bg-red-100"); // requisito 2 en rojo

  fireEvent.change(input, { target: { value: "holamundo1" } }); // escribe "holamundo1"
  expect(screen.getByTestId("req-0").className).toContain("bg-green-100"); // req0 cumple
  expect(screen.getByTestId("req-1").className).toContain("bg-green-100"); // req1 cumple
  expect(screen.getByTestId("req-2").className).toContain("bg-red-100"); // req2 aún no cumple

  fireEvent.change(input, { target: { value: "Holamundo1" } }); // escribe con mayúscula
  expect(screen.getByTestId("req-2").className).toContain("bg-green-100"); // ahora req2 cumple
  });

  test("muestra mensaje de contraseña válida", () => { // prueba mensaje final
    render(<PasswordValidator />); // renderiza componente
    const input = screen.getByTestId("input-password"); // obtiene input
    fireEvent.change(input, { target: { value: "Holamundo1" } }); // escribe contraseña válida
    expect(screen.getByTestId("valid-msg")).toBeInTheDocument(); // verifica mensaje "Contraseña válida"
  });
});
