import { render, screen } from "@testing-library/react";
import RoomCard from "./index";

describe("Test the RoomCard component", () => {
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
});
