import Booking from "@/entities/Booking";
import { StateCreator } from "zustand";

export interface BookingSlice {
  currentBooking: Booking;
  setCurrentBooking: (booking: Booking) => void;
}

export const createBookingSlices: StateCreator<
  BookingSlice,
  [],
  [["zustand/persist", BookingSlice]]
> = (set) => ({
  currentBooking: {
    customer: "",
    email: "",
    id: "",
    days: 0,
    isActive: true,
    room: {
      hasAir: true,
      hasKitchen: true,
      isPetFriendly: true,
      hasWifi: true,
      id: "",
      image: "",
      isAvailable: false,
      name: "",
      price: 0,
    },
  },
  setCurrentBooking: (booking: Booking) => {
    set({
      currentBooking: booking,
    });
  },
});
