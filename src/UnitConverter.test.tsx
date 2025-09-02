import { fireEvent, render, screen } from "@testing-library/react";
import UnitConverter from "./components/UnitConverter";

describe("UnitConverter", () => {
  test("renderiza el formulario", () => {
    render(<UnitConverter />);
    expect(screen.getByText(/Conversor de Unidades/i)).toBeInTheDocument();
    expect(screen.getByTestId("input-celsius")).toBeInTheDocument();
    expect(screen.getByTestId("convert-btn")).toBeInTheDocument();
    expect(screen.getByTestId("input-fahrenheit")).toBeInTheDocument();
  });

  test("convierte Celsius a Fahrenheit correctamente", () => {
    render(<UnitConverter />);
    fireEvent.change(screen.getByTestId("input-celsius"), { target: { value: "0" } });
    fireEvent.click(screen.getByTestId("convert-btn"));
    expect(screen.getByTestId("input-fahrenheit")).toHaveValue("32.00");

    fireEvent.change(screen.getByTestId("input-celsius"), { target: { value: "100" } });
    fireEvent.click(screen.getByTestId("convert-btn"));
    expect(screen.getByTestId("input-fahrenheit")).toHaveValue("212.00");

    fireEvent.change(screen.getByTestId("input-celsius"), { target: { value: "-40" } });
    fireEvent.click(screen.getByTestId("convert-btn"));
    expect(screen.getByTestId("input-fahrenheit")).toHaveValue("-40.00");
  });
});
