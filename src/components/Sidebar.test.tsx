import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
	test("renderiza elementos de navegación", () => {
		render(
			<MemoryRouter>
				<Sidebar />
			</MemoryRouter>
		);
		expect(screen.getByText(/Tabla de Multiplicar/i)).toBeInTheDocument();
		expect(screen.getByText(/Conversor de Unidades/i)).toBeInTheDocument();
	});
});
