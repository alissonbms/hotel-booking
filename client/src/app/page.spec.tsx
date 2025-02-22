import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Test the Home page", () => {
  test("Should have 3 buttons in Home Page", async () => {
    render(<Home />);

    const buttons = await screen.findAllByRole("button");
    const bookBtn = screen.queryByText("Book room");
    const checkBtn = screen.queryByText("Check booking");
    const FindOutBtn = screen.queryByText("Find out now");

    expect(buttons).toHaveLength(3);
    expect(bookBtn).toBeInTheDocument();
    expect(checkBtn).toBeInTheDocument();
    expect(FindOutBtn).toBeInTheDocument();
  });
  test("Should have a logo in Home Page", async () => {
    render(<Home />);

    const logoTitle = await screen.findByText("Cubic Hotel");
    const logoImage = await screen.findByRole("img", {
      name: "Cubic Hotel image logo",
    });
    expect(logoTitle).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
  });
});
