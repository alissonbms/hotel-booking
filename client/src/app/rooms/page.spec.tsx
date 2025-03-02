import { render, screen, waitFor } from "@testing-library/react";
import Rooms from "./page";

describe("Test the Rooms page", () => {
  test("Should have a header with a logo", async () => {
    render(<Rooms />);

    const logoTitle = await screen.findByText("Cubic Hotel");
    const logoImage = await screen.findByRole("img", {
      name: "Cubic Hotel image logo",
    });

    expect(logoTitle).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
  });
  test("Should have a title", async () => {
    render(<Rooms />);

    const title = await screen.findByText("Available rooms");

    expect(title).toBeInTheDocument();
  });
  test("Should have a rooms list", async () => {
    render(<Rooms />);

    const roomsList = await screen.findByRole("list");

    expect(roomsList).toBeInTheDocument();
  });

  test("Should have a room with the name 'Super room' at the rooms list", async () => {
    render(<Rooms />);

    const room = await screen.findByText("Super room");

    waitFor(() => expect(room).toBeInTheDocument());
  });
});
