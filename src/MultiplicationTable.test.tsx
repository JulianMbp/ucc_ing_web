import { fireEvent, render, screen } from "@testing-library/react";
import MultiplicationTable from "./components/MultiplicationTable";

describe("MultiplicationTable", () => {
  test("renderiza título y controles", () => {
    render(<MultiplicationTable />);
    expect(screen.getByText(/Tabla de Multiplicar/i)).toBeInTheDocument();
    expect(screen.getByTestId("input-number")).toBeInTheDocument();
    expect(screen.getByTestId("generate-btn")).toBeInTheDocument();
  });

  test("genera la tabla de multiplicar correcta", () => {
    render(<MultiplicationTable />);
    fireEvent.change(screen.getByTestId("input-number"), { target: { value: "5" } });
    fireEvent.click(screen.getByTestId("generate-btn"));
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(10);
    expect(items[0]).toHaveTextContent("5 x 1 = 5");
    expect(items[9]).toHaveTextContent("5 x 10 = 50");
  });

  test("actualiza la tabla al cambiar el número", () => {
    render(<MultiplicationTable />);
    fireEvent.change(screen.getByTestId("input-number"), { target: { value: "3" } });
    fireEvent.click(screen.getByTestId("generate-btn"));
    expect(screen.getByText("3 x 1 = 3")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("input-number"), { target: { value: "7" } });
    fireEvent.click(screen.getByTestId("generate-btn"));
    expect(screen.getByText("7 x 1 = 7")).toBeInTheDocument();
    expect(screen.getByText("7 x 10 = 70")).toBeInTheDocument();
  });
});
