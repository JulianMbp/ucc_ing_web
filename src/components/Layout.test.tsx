import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

describe("Layout", () => {
	test("renderiza Navbar y Sidebar", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route path="/" element={<Layout />}> 
						<Route index element={<div>Home Content</div>} />
					</Route>
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByText(/UCC : Prácticas Desarrollo Multimedia/i)).toBeInTheDocument();
		expect(screen.getByText(/Home Content/i)).toBeInTheDocument();
	});
});
