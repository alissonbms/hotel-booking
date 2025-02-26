import { fireEvent, render, screen } from "@testing-library/react";
import BookingCheck from "./page";

describe("Test Booking Consult page", () => {
  vi.mock("next/navigation", () => ({
    useRouter() {
      return {
        push: vi.fn(),
      };
    },
  }));

  test("Should have a logo", async () => {
    render(<BookingCheck />);

    const logoTitle = await screen.findByText("Cubic Hotel");
    const logoImage = await screen.findByRole("img", {
      name: "Cubic Hotel image logo",
    });

    expect(logoTitle).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
  });
  test("Should have a title", async () => {
    render(<BookingCheck />);

    const title = await screen.findByText("Enter your booking code");

    expect(title).toBeInTheDocument();
  });
  test("Should have a input", async () => {
    render(<BookingCheck />);

    const input = screen.getByPlaceholderText("Paste here your code");

    expect(input).toBeInTheDocument();
  });
  test("Should have a 'Check booking' button", async () => {
    render(<BookingCheck />);

    const button = screen.getByRole("button", {
      name: "Check booking",
    });

    expect(button).toBeInTheDocument();
  });
  test("Should find a booking with a valid id", async () => {
    render(<BookingCheck />);

    const input = screen.getByPlaceholderText("Paste here your code");
    fireEvent.change(input, {
      target: {
        value: "d4543ef4-40d3-423a-8a93-ecd7d79f1d5f",
      },
    });

    const button = screen.getByRole("button", {
      name: "Check booking",
    });
    fireEvent.click(button);

    const errorTag = screen.queryByTestId("error");
    const errorButton = screen.queryByText("See available rooms");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(errorTag).toBeNull();
    expect(errorButton).toBeNull();
  });
  test("Should not find a booking with an invalid id", async () => {
    render(<BookingCheck />);

    const input = screen.getByPlaceholderText("Paste here your code");
    fireEvent.change(input, {
      target: {
        value: "d4543ef4-40d3-423a-8a93-ecd7d79f1d5faaaa",
      },
    });

    const button = screen.getByRole("button", {
      name: "Check booking",
    });
    fireEvent.click(button);

    const errorTag = screen.queryByTestId("error");
    const errorText = screen.queryByText(
      "No bookings found with the code provided. Please check the code, and click the “Check booking” button again, or view the rooms available for booking.",
    );
    const errorButton = screen.queryByText("See available rooms");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(errorTag).toBeInTheDocument();
    expect(errorTag).toEqual(errorText);
    expect(errorButton).toBeInTheDocument();
  });
});
