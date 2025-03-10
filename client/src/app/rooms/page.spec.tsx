import { render, screen, waitFor } from "@testing-library/react";
import Rooms from "./page";
import { container, Registry } from "@/infra/ContainerRegistry";
import { RoomsInMemoryGateway } from "@/gateways/room/RoomsInMemoryGateway";
import { faker } from "@faker-js/faker";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe("Test the Rooms page", () => {
  beforeEach(() => {
    container.rebind(Registry.RoomsHttpGateway).toDynamicValue(() => {
      return new RoomsInMemoryGateway([
        {
          id: faker.database.collation(),
          name: "Street room",
          price: parseFloat(faker.commerce.price()),
          image: faker.image.url(),
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: true,
        },
        {
          id: faker.database.collation(),
          name: "Sailor room",
          price: parseFloat(faker.commerce.price()),
          image: faker.image.url(),
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: true,
        },
      ]);
    });
  });

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

  test("Should have a room with the name 'Street room' at the rooms list", async () => {
    render(<Rooms />);

    const room = await screen.findByText("Street room");

    waitFor(() => expect(room).toBeInTheDocument());
  });
});
