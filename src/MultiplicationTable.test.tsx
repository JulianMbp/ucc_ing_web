import { fireEvent, render, screen } from "@testing-library/react"; // importa utilidades de testing
import MultiplicationTable from "./components/MultiplicationTable"; // importa el componente a probar

describe("MultiplicationTable", () => { // agrupa las pruebas del componente
  test("renderiza título y controles", () => { // caso: verifica render básico
    render(<MultiplicationTable />); // renderiza el componente en el DOM virtual
    expect(screen.getByText(/Tabla de Multiplicar/i)).toBeInTheDocument(); // espera título visible
    expect(screen.getByTestId("input-number")).toBeInTheDocument(); // espera input presente
    expect(screen.getByTestId("generate-btn")).toBeInTheDocument(); // espera botón presente
  });

  test("genera la tabla de multiplicar correcta", () => { // caso: genera tabla para un número
    render(<MultiplicationTable />); // renderiza componente
    fireEvent.change(screen.getByTestId("input-number"), { target: { value: "5" } }); // simula entrada de número 5
    fireEvent.click(screen.getByTestId("generate-btn")); // simula clic en generar
    const items = screen.getAllByRole("listitem"); // obtiene los elementos de la lista
    expect(items).toHaveLength(10); // verifica que hay 10 filas (1..10)
    expect(items[0]).toHaveTextContent("5 x 1 = 5"); // verifica primera fila
    expect(items[9]).toHaveTextContent("5 x 10 = 50"); // verifica última fila
  });

  test("actualiza la tabla al cambiar el número", () => { // caso: actualizar tabla con nuevo número
    render(<MultiplicationTable />); // renderiza componente
    fireEvent.change(screen.getByTestId("input-number"), { target: { value: "3" } }); // setea 3
    fireEvent.click(screen.getByTestId("generate-btn")); // genera tabla de 3
    expect(screen.getByText("3 x 1 = 3")).toBeInTheDocument(); // verifica tabla 3
    fireEvent.change(screen.getByTestId("input-number"), { target: { value: "7" } }); // cambia a 7
    fireEvent.click(screen.getByTestId("generate-btn")); // genera tabla de 7
    expect(screen.getByText("7 x 1 = 7")).toBeInTheDocument(); // verifica nueva primera fila
    expect(screen.getByText("7 x 10 = 70")).toBeInTheDocument(); // verifica nueva última fila
  });
});
