import { fireEvent, render, screen } from "@testing-library/react";
import PasswordValidator from "./components/PasswordValidator";

describe("PasswordValidator", () => {
  test("renderiza campos y requisitos", () => {
    render(<PasswordValidator />);
    expect(screen.getByText(/Validador de Contraseñas/i)).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("requirements-list")).toBeInTheDocument();
  });

  test("actualiza requisitos según la contraseña", () => {
  render(<PasswordValidator />);
  const input = screen.getByTestId("input-password");
  fireEvent.change(input, { target: { value: "hola" } });
  // Deben estar en rojo (clase bg-red-100)
  expect(screen.getByTestId("req-0").className).toContain("bg-red-100");
  expect(screen.getByTestId("req-1").className).toContain("bg-red-100");
  expect(screen.getByTestId("req-2").className).toContain("bg-red-100");

  fireEvent.change(input, { target: { value: "holamundo1" } });
  expect(screen.getByTestId("req-0").className).toContain("bg-green-100");
  expect(screen.getByTestId("req-1").className).toContain("bg-green-100");
  expect(screen.getByTestId("req-2").className).toContain("bg-red-100");

  fireEvent.change(input, { target: { value: "Holamundo1" } });
  expect(screen.getByTestId("req-2").className).toContain("bg-green-100");
  });

  test("muestra mensaje de contraseña válida", () => {
    render(<PasswordValidator />);
    const input = screen.getByTestId("input-password");
    fireEvent.change(input, { target: { value: "Holamundo1" } });
    expect(screen.getByTestId("valid-msg")).toBeInTheDocument();
  });
});
