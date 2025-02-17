import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Test the Home page", () => {
  test("Should have 3 buttons in Home Page", async () => {
    render(<Home />);

    const buttons = await screen.findAllByRole("button");
    const reservationBtn = screen.queryByText("Reservar quarto");
    const consultBtn = screen.queryByText("Consultar reserva");
    const discoveryBtn = screen.queryByText("Descobrir agora");

    expect(buttons).toHaveLength(3);
    expect(reservationBtn).toBeInTheDocument();
    expect(consultBtn).toBeInTheDocument();
    expect(discoveryBtn).toBeInTheDocument();
  });
  test("Should have a logo in Home Page", async () => {
    render(<Home />);

    const logo = await screen.findByText("Cubic Hotel");
    const img = await screen.findByRole("img");
    expect(logo).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
});
