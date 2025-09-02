import { fireEvent, render, screen } from "@testing-library/react";
import TodoList from "./components/TodoList";

describe("TodoList", () => {
  test("renderiza input y botón para agregar tareas", () => {
    render(<TodoList />);
    expect(screen.getByText(/Lista de Tareas/i)).toBeInTheDocument();
    expect(screen.getByTestId("input-task")).toBeInTheDocument();
    expect(screen.getByTestId("add-btn")).toBeInTheDocument();
  });

  test("agrega una nueva tarea a la lista", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByTestId("input-task"), { target: { value: "Estudiar" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(screen.getByText("Estudiar")).toBeInTheDocument();
  });

  test("elimina una tarea de la lista", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByTestId("input-task"), { target: { value: "Tarea 1" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    const deleteBtn = screen.getByText("Eliminar");
    fireEvent.click(deleteBtn);
    expect(screen.queryByText("Tarea 1")).not.toBeInTheDocument();
  });

  test("muestra mensaje cuando no hay tareas y lista cuando hay varias", () => {
    render(<TodoList />);
    expect(screen.getByTestId("empty-msg")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("input-task"), { target: { value: "A" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.change(screen.getByTestId("input-task"), { target: { value: "B" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
