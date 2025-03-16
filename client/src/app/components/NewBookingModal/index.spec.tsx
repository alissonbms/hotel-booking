import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import NewBookingModal from "./index";
import { useState } from "react";
import { useAppStore } from "@/store";
import { container, Registry } from "@/infra/ContainerRegistry";
import { BookingsInMemoryGateway } from "@/gateways/booking/BookingsInMemoryGateway";
import { faker } from "@faker-js/faker";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe("Test the NewBookingModal component", () => {
  beforeEach(() => {
    container.rebind(Registry.BookingsHttpGateway).toDynamicValue(() => {
      return new BookingsInMemoryGateway([
        {
          id: faker.database.collation(),
          customer: "Jessy",
          email: "jessy@email.email",
          isActive: true,
          days: 2,
          room: {
            id: faker.database.collation(),
            hasAir: true,
            hasKitchen: true,
            isPetFriendly: true,
            hasWifi: true,
            image: faker.image.url(),
            isAvailable: false,
            name: faker.company.name(),
            price: parseFloat(faker.commerce.price()),
          },
        },
        {
          id: faker.database.collation(),
          customer: "James",
          email: "james@email.email",
          days: 4,
          isActive: true,
          room: {
            id: faker.database.collation(),
            hasAir: true,
            hasKitchen: true,
            isPetFriendly: true,
            hasWifi: true,
            image: faker.image.url(),
            isAvailable: false,
            name: faker.company.name(),
            price: parseFloat(faker.commerce.price()),
          },
        },
      ]);
    });
  });
  function setup() {
    const { result } = renderHook(() => {
      const [open, setOpen] = useState(true);

      return { open, setOpen };
    });

    const renderAppStore = renderHook(() => useAppStore());

    waitFor(() =>
      renderAppStore.result.current.setCurrentRoom({
        id: "123789456",
        name: "Other room",
        price: 750,
        image: "/assets/hotel-room-cover.jpg",
        hasWifi: true,
        hasAir: true,
        hasKitchen: true,
        isPetFriendly: true,
        isAvailable: false,
      }),
    );

    render(
      <NewBookingModal
        open={result.current.open}
        handleClose={() => result.current.setOpen(false)}
      />,
    );

    return { renderAppStore };
  }
  test("Should not render the NotificationDialog component initially", () => {
    setup();

    expect(screen.queryByText("Booking made!")).toBeNull();
  });
  test("Should show NotificationDialog component on 'Confirm booking' button click", async () => {
    setup();
    const customerNameInput = screen.getByPlaceholderText(
      "Enter the customer name",
    );
    fireEvent.change(customerNameInput, {
      target: { value: "John" },
    });

    const emailInput = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailInput, {
      target: { value: "john@email.email" },
    });

    const daysInput = screen.getByTestId("number-of-days-stay");
    fireEvent.change(daysInput, {
      target: { value: 5 },
    });

    const openNotificationBtn = await screen.findByRole("button", {
      name: "Confirm booking",
    });

    expect(openNotificationBtn).toBeInTheDocument();
    fireEvent.click(openNotificationBtn);

    expect(await screen.findByText("Booking made!")).toBeInTheDocument();
  });
  test("Should hide NotificationDialog component when clicking 'Close' anchor tag", async () => {
    setup();

    const customerNameInput = screen.getByPlaceholderText(
      "Enter the customer name",
    );
    fireEvent.change(customerNameInput, {
      target: { value: "John" },
    });

    const emailInput = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailInput, {
      target: { value: "john@email.email" },
    });

    const daysInput = screen.getByTestId("number-of-days-stay");
    fireEvent.change(daysInput, {
      target: { value: 5 },
    });

    const openNotificationBtn = await screen.findByRole("button", {
      name: "Confirm booking",
    });

    expect(openNotificationBtn).toBeInTheDocument();
    fireEvent.click(openNotificationBtn);

    const btnCloseNotificationDialog = await screen.findByText("Check booking");
    expect(btnCloseNotificationDialog).toBeInTheDocument();

    fireEvent.click(btnCloseNotificationDialog);

    expect(screen.queryByText("Booking made!")).toBeNull();
  });
  test("Should have a title and a subtitle", () => {
    setup();

    const title = screen.queryByText("New booking");
    const subtitle = screen.queryByText("Complete your booking below");

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });
  test("Should have an image of the room", async () => {
    setup();

    const roomImage = await screen.findByRole("img");

    expect(roomImage).toBeInTheDocument();
  });
  test("Should have a room with the title 'Other room'", () => {
    setup();

    const roomName = screen.queryByText("Other room");

    expect(roomName).toBeInTheDocument();
  });
  test("Should have a room with the price of $750.00", () => {
    setup();

    const roomPrice = screen.queryByText("$750.00");

    expect(roomPrice).toBeInTheDocument();
  });
  test("Should have three entries (and labels) for 'Customer Name', 'Email' and 'Days of stay' respectively (2 textbox and one for number)", async () => {
    setup();

    const inputs = await screen.findAllByRole("textbox");

    const customerNameInput = screen.queryByPlaceholderText(
      "Enter the customer name",
    );
    const emailInput = screen.queryByPlaceholderText("Enter your email");
    const daysInput = screen.getByTestId("number-of-days-stay");

    const customerNameLabel = screen.queryByText("Name");
    const emailLabel = screen.queryByText("Email");
    const daysLabel = screen.queryByText("Days");

    expect(inputs).toHaveLength(2);
    expect(customerNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(daysInput).toBeInTheDocument();
    expect(customerNameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(daysLabel).toBeInTheDocument();
  });
  test("Should have two buttons called 'Cancel' and 'Confirm booking' respectively", async () => {
    setup();

    const buttons = await screen.findAllByRole("button");

    const cancelBtn = screen.queryByText("Cancel");
    const confirmBtn = screen.queryByText("Confirm booking");

    expect(buttons).toHaveLength(2);
    expect(cancelBtn).toBeInTheDocument();
    expect(confirmBtn).toBeInTheDocument();
  });
  test("When filling the data and clicking the button, a new booking should be created", async () => {
    const { renderAppStore } = setup();

    const customerNameInput = screen.getByPlaceholderText(
      "Enter the customer name",
    );
    fireEvent.change(customerNameInput, {
      target: { value: "John" },
    });

    const emailInput = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailInput, {
      target: { value: "john@email.email" },
    });

    const daysInput = screen.getByTestId("number-of-days-stay");
    fireEvent.change(daysInput, {
      target: { value: 5 },
    });

    const confirmBtn = screen.getByText("Confirm booking");
    fireEvent.click(confirmBtn);

    waitFor(() =>
      expect(renderAppStore.result.current.currentBooking.email).toBe(
        "john@email.email",
      ),
    );
    waitFor(() =>
      expect(renderAppStore.result.current.currentBooking.customer).toBe(
        "John",
      ),
    );
    waitFor(() =>
      expect(renderAppStore.result.current.currentBooking.days).toBe(5),
    );
  });
});
