"use client";

import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import MyBooking from "./page";
import { useAppStore } from "@/store";
import { faker } from "@faker-js/faker";

const mockBack = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe("Test the MyBooking page", () => {
  function setup() {
    const { result } = renderHook(() => useAppStore());

    result.current.setCurrentBooking({
      id: "7c85ebd0-b522-4f25-97ee-ca6cb40fc6ea",
      customer: "Carol",
      email: "caraol@email.email",
      days: 3,
      isActive: true,
      room: {
        hasAir: true,
        hasKitchen: true,
        isPetFriendly: false,
        hasWifi: true,
        id: faker.database.collation(),
        image: faker.image.url(),
        isAvailable: false,
        name: "Amazing room",
        price: 450,
      },
    });

    render(<MyBooking />);

    return { result };
  }
  test("Should call router.back() when button 'Go back' is clicked", async () => {
    setup();

    const button = screen.getByText("Go back");
    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
  test("Should have a title", async () => {
    setup();

    const title = screen.getByText("Bookings");
    expect(title).toBeInTheDocument();
  });
  test("Should have an image", async () => {
    setup();

    const image = await screen.findByRole("img", { name: "hotel room cover" });

    expect(image).toBeInTheDocument();
  });
  test("Should have a button", async () => {
    setup();

    const button = await screen.findByRole("button", {
      name: "Go back",
    });

    expect(button).toBeInTheDocument();
  });
  test("Should have two inputs with their labels", async () => {
    setup();

    const inputs = await screen.findAllByRole("textbox");
    const nameLabel = await screen.findByText("Name");
    const priceLabel = await screen.findByText("Price per night");

    expect(inputs).toHaveLength(2);
    expect(nameLabel).toBeInTheDocument();
    expect(priceLabel).toBeInTheDocument();
  });
  test("There should be the current booking data, such as room name and price per night, filling in the entries", async () => {
    setup();

    const inputs = await screen.findAllByRole("textbox");
    expect(inputs).toHaveLength(2);

    expect(inputs[0].getAttribute("value")).toBe("Amazing room");
    expect(inputs[1].getAttribute("value")).toBe("$450.00");
  });
  test("Should have four inputs checkbox with their labels", async () => {
    setup();
    const checkboxInputs = await screen.findAllByRole("checkbox");
    const wifiCheckbox = await screen.findByText("WiFi");
    const airConditioningCheckbox = await screen.findByText("Air conditioning");
    const kitchenCheckbox = await screen.findByText("Kitchen");
    const petFriendlyCheckbox = await screen.findByText("Pet friendly");
    expect(checkboxInputs).toHaveLength(4);
    expect(wifiCheckbox).toBeInTheDocument();
    expect(airConditioningCheckbox).toBeInTheDocument();
    expect(kitchenCheckbox).toBeInTheDocument();
    expect(petFriendlyCheckbox).toBeInTheDocument();
  });
  test("Should have the wifi checkbox being checked and petFriendly checkbox being unchecked", async () => {
    setup();

    const checkboxInputs = await screen.findAllByRole("checkbox");

    const wifiCheckbox = checkboxInputs[0] as HTMLElement & {
      checked: boolean;
    };
    const petFriendlyCheckbox = checkboxInputs[3] as HTMLElement & {
      checked: boolean;
    };

    expect(wifiCheckbox.getAttribute("value")).toBe("wifi");
    expect(wifiCheckbox.checked).toBe(true);

    expect(petFriendlyCheckbox.getAttribute("value")).toBe("pet-friendly");
    expect(petFriendlyCheckbox.checked).toBe(false);
  });

  test("Should have the booking code on the screen", async () => {
    setup();

    expect(
      screen.queryByText("7c85ebd0-b522-4f25-97ee-ca6cb40fc6ea"),
    ).toBeInTheDocument();
  });
});
