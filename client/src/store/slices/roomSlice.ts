import Room from "@/entities/Room";
import { StateCreator } from "zustand";

export interface RoomSlice {
  rooms: Room[];
  setRooms: (newRooms: Room[]) => void;
  currentRoom: Room;
  setCurrentRoom: (room: Room) => void;
}

export const createRoomSlices: StateCreator<
  RoomSlice,
  [],
  [["zustand/persist", RoomSlice]]
> = (set) => ({
  rooms: [],
  setRooms: (newRooms: Room[]) => {
    set({ rooms: newRooms });
  },
  currentRoom: {
    id: "",
    name: "",
    price: 0,
    image: "",
    hasWifi: true,
    hasAir: true,
    hasKitchen: true,
    isPetFriendly: false,
    isAvailable: true,
  },
  setCurrentRoom: (room: Room) => {
    set({
      currentRoom: room,
    });
  },
});
