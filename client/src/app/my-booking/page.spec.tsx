"use client";

import { fireEvent, render, screen } from "@testing-library/react";
import MyBooking from "./page";

const mockBack = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe("Test the MyBooking page", () => {
  test("Should call router.back() when button 'Go back' is clicked", async () => {
    render(<MyBooking />);

    const button = screen.getByText("Go back");
    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
  test("Should have a title", async () => {
    render(<MyBooking />);

    const title = screen.getByText("Bookings");
    expect(title).toBeInTheDocument();
  });
  test("Should have an image", async () => {
    render(<MyBooking />);

    const image = await screen.findByRole("img", { name: "hotel room cover" });

    expect(image).toBeInTheDocument();
  });
  test("Should have a button", async () => {
    render(<MyBooking />);

    const button = await screen.findByRole("button", {
      name: "Go back",
    });

    expect(button).toBeInTheDocument();
  });
  test("Should have two inputs with their labels", async () => {
    render(<MyBooking />);

    const inputs = await screen.findAllByRole("textbox");
    const nameLabel = await screen.findByText("Name");
    const priceLabel = await screen.findByText("Price per night");

    expect(inputs).toHaveLength(2);
    expect(nameLabel).toBeInTheDocument();
    expect(priceLabel).toBeInTheDocument();
  });

  test("Should have four inputs checkbox with their labels", async () => {
    render(<MyBooking />);

    const checkboxInputs = await screen.findAllByRole("checkbox");
    const wifiCheckbox = await screen.findByText("Wi-Fi");
    const airConditioningCheckbox = await screen.findByText("Air conditioning");
    const kitchenCheckbox = await screen.findByText("Kitchen");
    const petFriendlyCheckbox = await screen.findByText("Pet friendly");
    expect(checkboxInputs).toHaveLength(4);
    expect(wifiCheckbox).toBeInTheDocument();
    expect(airConditioningCheckbox).toBeInTheDocument();
    expect(kitchenCheckbox).toBeInTheDocument();
    expect(petFriendlyCheckbox).toBeInTheDocument();
  });
});
