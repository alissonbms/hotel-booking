import { render, renderHook, screen } from "@testing-library/react";
import NewBookingModal from "./index";
import { useState } from "react";

describe("Test the NewBookingModal component", () => {
  beforeEach(() => {
    const { result } = renderHook(() => {
      const [open, setOpen] = useState(true);

      return { open, setOpen };
    });

    render(
      <NewBookingModal
        open={result.current.open}
        handleClose={() => result.current.setOpen(false)}
      />,
    );
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
