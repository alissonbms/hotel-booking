import { fireEvent, render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import RoomCard from "./index";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe("Test the RoomCard component", () => {
  test("Should have an image", async () => {
    render(
      <RoomCard
        room={{
          id: faker.database.collation(),
          name: "Super room",
          price: 50000,
          image: faker.image.url(),
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
          id: faker.database.collation(),
          name: "Super room",
          price: 50000,
          image: faker.image.url(),
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
          id: faker.database.collation(),
          name: "Super room",
          price: 50000,
          image: faker.image.url(),
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
          id: faker.database.collation(),
          name: "Super room",
          price: 50000,
          image: faker.image.url(),
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
          id: faker.database.collation(),
          name: "Super room",
          price: 300,
          image: faker.image.url(),
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
          id: faker.database.collation(),
          name: "Super room",
          price: 50000,
          image: faker.image.url(),
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
  test("Should show NewBookingModal component when button 'Book room' is clicked", async () => {
    render(
      <RoomCard
        room={{
          id: faker.database.collation(),
          name: "Super room",
          price: 50000,
          image: faker.image.url(),
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: false,
        }}
      />,
    );

    expect(screen.queryByText("New booking")).not.toBeInTheDocument();

    const bookBtn = await screen.findByRole("button", {
      name: "Book room",
    });

    fireEvent.click(bookBtn);

    expect(screen.queryByText("New booking")).toBeInTheDocument();
  });
  test("Should hide NewBookingModal component when clicking 'Cancel' button", async () => {
    render(
      <RoomCard
        room={{
          id: faker.database.collation(),
          name: "Super room",
          price: 50000,
          image: faker.image.url(),
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: false,
        }}
      />,
    );

    expect(screen.queryByText("New booking")).not.toBeInTheDocument();

    const bookBtn = await screen.findByRole("button", {
      name: "Book room",
    });

    fireEvent.click(bookBtn);

    expect(screen.queryByText("New booking")).toBeInTheDocument();

    const cancelBtn = await screen.findByRole("button", {
      name: "Cancel",
    });

    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
    expect(screen.queryByText("New booking")).not.toBeInTheDocument();
  });
});
