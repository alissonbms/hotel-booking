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

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe("Test the NewBookingModal component", () => {
  beforeEach(() => {
    const { result } = renderHook(() => {
      const [open, setOpen] = useState(true);

      return { open, setOpen };
    });

    const renderStore = renderHook(() => useAppStore());

    waitFor(() =>
      renderStore.result.current.setCurrentRoom({
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
  });
  test("Should not render the NotificationDialog component initially", () => {
    expect(screen.queryByText("Booking made!")).not.toBeInTheDocument();
  });
  test("Should show NotificationDialog component on 'Confirm booking' button click", async () => {
    const openNotificationBtn = await screen.findByRole("button", {
      name: "Confirm booking",
    });

    fireEvent.click(openNotificationBtn);

    expect(screen.queryByText("Booking made!")).toBeInTheDocument();
  });
  test("Should hide NotificationDialog component when clicking 'Close' anchor tag", async () => {
    const openNotificationBtn = await screen.findByRole("button", {
      name: "Confirm booking",
    });

    fireEvent.click(openNotificationBtn);
    expect(screen.queryByText("Booking made!")).toBeInTheDocument();

    const actionTextClose = screen.queryByText("Close");

    fireEvent.click(actionTextClose as unknown as Element);

    expect(screen.queryByText("Booking made!")).not.toBeInTheDocument();
  });

  test("Should have a title and a subtitle", () => {
    const title = screen.queryByText("New booking");
    const subtitle = screen.queryByText("Complete your booking below");

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });
  test("Should have an image of the room", async () => {
    const roomImage = await screen.findByRole("img");

    expect(roomImage).toBeInTheDocument();
  });
  test("Should have a room with the title 'Other room'", () => {
    const roomName = screen.queryByText("Other room");

    expect(roomName).toBeInTheDocument();
  });
  test("Should have a room with the price of $750.00", () => {
    const roomPrice = screen.queryByText("$750.00");

    expect(roomPrice).toBeInTheDocument();
  });
  test("Should have two entries (and labels) for 'Guest Name' and 'Email' respectively", async () => {
    const inputs = await screen.findAllByRole("textbox");

    const guestNameInput = screen.queryByPlaceholderText(
      "Enter the guest name",
    );
    const emailInput = screen.queryByPlaceholderText("Enter your email");

    const guestNameLabel = screen.queryByText("Name");
    const emailLabel = screen.queryByText("Email");

    expect(inputs).toHaveLength(2);
    expect(guestNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(guestNameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
  });
  test("Should have two buttons called 'Cancel' and 'Confirm booking' respectively", async () => {
    const buttons = await screen.findAllByRole("button");

    const cancelBtn = screen.queryByText("Cancel");
    const confirmBtn = screen.queryByText("Confirm booking");

    expect(buttons).toHaveLength(2);
    expect(cancelBtn).toBeInTheDocument();
    expect(confirmBtn).toBeInTheDocument();
  });
});
