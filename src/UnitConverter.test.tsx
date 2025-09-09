import { fireEvent, render, screen } from "@testing-library/react"; // importa utilidades de testing
import UnitConverter from "./components/UnitConverter"; // importa componente

describe("UnitConverter", () => { // agrupa pruebas del conversor
  test("renderiza el formulario", () => { // prueba render básico
    render(<UnitConverter />); // renderiza componente
    expect(screen.getByText(/Conversor de Unidades/i)).toBeInTheDocument(); // verifica título
    expect(screen.getByTestId("input-celsius")).toBeInTheDocument(); // verifica input Celsius
    expect(screen.getByTestId("convert-btn")).toBeInTheDocument(); // verifica botón Convertir
    expect(screen.getByTestId("input-fahrenheit")).toBeInTheDocument(); // verifica output Fahrenheit
  });

  test("convierte Celsius a Fahrenheit correctamente", () => { // prueba lógica de conversión
    render(<UnitConverter />); // renderiza componente
    fireEvent.change(screen.getByTestId("input-celsius"), { target: { value: "0" } }); // ingresa 0°C
    fireEvent.click(screen.getByTestId("convert-btn")); // pulsa convertir
    expect(screen.getByTestId("input-fahrenheit")).toHaveValue("32.00"); // espera 32°F

    fireEvent.change(screen.getByTestId("input-celsius"), { target: { value: "100" } }); // ingresa 100°C
    fireEvent.click(screen.getByTestId("convert-btn")); // convierte
    expect(screen.getByTestId("input-fahrenheit")).toHaveValue("212.00"); // espera 212°F

    fireEvent.change(screen.getByTestId("input-celsius"), { target: { value: "-40" } }); // ingresa -40°C
    fireEvent.click(screen.getByTestId("convert-btn")); // convierte
    expect(screen.getByTestId("input-fahrenheit")).toHaveValue("-40.00"); // espera -40°F
  });
});
