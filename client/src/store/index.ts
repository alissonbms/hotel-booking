import { create } from "zustand";
import { createRoomSlices, RoomSlice } from "./slices/roomSlice";
import { persist } from "zustand/middleware";
import { BookingSlice, createBookingSlices } from "./slices/bookingSlice";

type StoreState = RoomSlice & BookingSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createRoomSlices(...a),
      ...createBookingSlices(...a),
    }),
    {
      name: "stateStorage",
    },
  ),
);
