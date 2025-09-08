import { fireEvent, render, screen } from "@testing-library/react";
import TodoList from "./components/TodoList";

// Suite de pruebas para el componente TodoList
describe("TodoList", () => {
  // Test: verificar que los controles básicos se renderizan
  test("renderiza input y botón para agregar tareas", () => {
    render(<TodoList />); // montamos el componente en el DOM de prueba
    // Comprobamos que el título está presente
    expect(screen.getByText(/Lista de Tareas/i)).toBeInTheDocument();
    // Verificamos que el input y el botón existen (localizados por data-testid)
    expect(screen.getByTestId("input-task")).toBeInTheDocument();
    expect(screen.getByTestId("add-btn")).toBeInTheDocument();
  });

  // Test: agregar una tarea y verificar que aparece en la lista
  test("agrega una nueva tarea a la lista", () => {
    render(<TodoList />); // montamos
    // Simulamos escribir 'Estudiar' en el input y pulsar Agregar
    fireEvent.change(screen.getByTestId("input-task"), { target: { value: "Estudiar" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    // Verificamos que la tarea aparece en el DOM
    expect(screen.getByText("Estudiar")).toBeInTheDocument();
  });

  // Test: eliminar una tarea añadida previamente
  test("elimina una tarea de la lista", () => {
    render(<TodoList />);
    // Agregamos una tarea llamada 'Tarea 1'
    fireEvent.change(screen.getByTestId("input-task"), { target: { value: "Tarea 1" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    // Localizamos el botón 'Eliminar' (en este test asumimos que es el que corresponde a la tarea creada)
    const deleteBtn = screen.getByText("Eliminar");
    fireEvent.click(deleteBtn); // Simulamos click en eliminar
    // Comprobamos que la tarea ya no está en el documento
    expect(screen.queryByText("Tarea 1")).not.toBeInTheDocument();
  });

  // Test: mostrar mensaje cuando no hay tareas y mostrar varias tareas cuando se agregan
  test("muestra mensaje cuando no hay tareas y lista cuando hay varias", () => {
    render(<TodoList />);
    // Mensaje de lista vacía
    expect(screen.getByTestId("empty-msg")).toBeInTheDocument();
    // Agregamos dos tareas A y B
    fireEvent.change(screen.getByTestId("input-task"), { target: { value: "A" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.change(screen.getByTestId("input-task"), { target: { value: "B" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    // Verificamos que ambas aparecen
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
