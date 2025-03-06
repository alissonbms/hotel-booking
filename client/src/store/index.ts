import { create } from "zustand";
import { createRoomSlices, RoomSlice } from "./slices/roomSlice";
import { persist } from "zustand/middleware";

type StoreState = RoomSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createRoomSlices(...a),
    }),
    {
      name: "stateStorage",
    },
  ),
);
