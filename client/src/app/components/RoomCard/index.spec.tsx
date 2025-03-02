import { render, screen } from "@testing-library/react";
import RoomCard from "./index";

describe("Test the RoomCard component", () => {
  test("Should have an image", async () => {
    render(
      <RoomCard
        room={{
          id: "123456789",
          name: "Super room",
          price: 50000,
          image: "/assets/hotel-room-cover.jpg",
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: false,
        }}
      />,
    );

    const image = await screen.findByRole("img");

    expect(image).toBeInTheDocument();
  });
  test("Should have a title", async () => {
    render(
      <RoomCard
        room={{
          id: "123456789",
          name: "Super room",
          price: 50000,
          image: "/assets/hotel-room-cover.jpg",
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: false,
        }}
      />,
    );

    const title = screen.queryByText("Super room");

    expect(title).toBeInTheDocument();
  });
  test("Should have the extra condition of being pet friendly", async () => {
    render(
      <RoomCard
        room={{
          id: "123456789",
          name: "Super room",
          price: 50000,
          image: "/assets/hotel-room-cover.jpg",
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          isAvailable: false,
        }}
      />,
    );

    const isPetFriendly = screen.queryByText("• Pet friendly");

    expect(isPetFriendly).toBeInTheDocument();
  });
  test("Should NOT have the extra condition of having Wifi", async () => {
    render(
      <RoomCard
        room={{
          id: "123456789",
          name: "Super room",
          price: 50000,
          image: "/assets/hotel-room-cover.jpg",
          hasWifi: false,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          isAvailable: false,
        }}
      />,
    );

    const hasWifi = screen.queryByText("• Wifi");

    expect(hasWifi).toBeNull();
  });
  test("Should have a price of $300.00", async () => {
    render(
      <RoomCard
        room={{
          id: "123456789",
          name: "Super room",
          price: 300,
          image: "/assets/hotel-room-cover.jpg",
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: false,
        }}
      />,
    );

    const price = screen.queryByText("$300.00");

    expect(price).toBeInTheDocument();
  });

  test("Should have a Book room button", async () => {
    render(
      <RoomCard
        room={{
          id: "123456789",
          name: "Super room",
          price: 50000,
          image: "/assets/hotel-room-cover.jpg",
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: false,
        }}
      />,
    );

    const bookBtn = await screen.findByRole("button");

    expect(bookBtn.textContent).toBe("Book room");
  });
});
