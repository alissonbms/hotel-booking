import Room from "@/entities/Room";
import IRoomsGateway from "./IRoomsGateway";

export class RoomsInMemoryGateway implements IRoomsGateway {
  protected rooms: Room[];

  constructor(rooms: Room[]) {
    this.rooms = rooms;
  }

  async getRooms(): Promise<Room[]> {
    return this.rooms;
  }

  async getRoom(roomId: string): Promise<Room> {
    if (!roomId) {
      throw new Error("Invalid room ID");
    }

    const room = this.rooms.find((r) => r.id === roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  async setRoom(room: Room): Promise<Room> {
    if (!room.id || !room.name || !room.price || !room.image) {
      throw new Error(
        "Failed while trying to finish the room creation, seems some info are missing",
      );
    }

    const newRoom = new Room(
      room.id,
      room.name,
      room.price,
      room.image,
      room.hasWifi,
      room.hasAir,
      room.hasKitchen,
      room.isPetFriendly,
      room.isAvailable,
    );

    this.rooms.push(newRoom);

    return newRoom;
  }

  async updateRoom(editedRoom: Room): Promise<Room> {
    if (!editedRoom.id) {
      throw new Error("Invalid room ID");
    }

    const existingRoom = this.rooms.find((r) => r.id === editedRoom.id);

    if (!existingRoom) {
      throw new Error("Room not found");
    }

    this.rooms[this.rooms.indexOf(existingRoom)] = editedRoom;

    return editedRoom;
  }

  async deleteRoom(roomId: string): Promise<Room> {
    if (!roomId) {
      throw new Error("Invalid room ID");
    }

    const room = this.rooms.find((r) => r.id === roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    this.rooms.slice(this.rooms.indexOf(room), 1);

    return room;
  }
}
