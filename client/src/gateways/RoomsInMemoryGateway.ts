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
    const room = this.rooms.find((r) => r.id === roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  async setRoom(newRoom: Room): Promise<Room> {
    this.rooms.push(
      new Room(
        newRoom.id,
        newRoom.name,
        newRoom.price,
        newRoom.image,
        newRoom.hasWifi,
        newRoom.hasAir,
        newRoom.hasKitchen,
        newRoom.isPetFriendly,
        newRoom.isAvailable,
      ),
    );

    return newRoom;
  }

  async updateRoom(editedRoom: Room): Promise<Room> {
    const existingRoom = this.rooms.find((r) => r.id === editedRoom.id);

    if (!existingRoom) {
      throw new Error("Room not found");
    }

    this.rooms[this.rooms.indexOf(existingRoom)] = editedRoom;

    return editedRoom;
  }

  async deleteRoom(roomId: string): Promise<Room> {
    const room = this.rooms.find((r) => r.id === roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    this.rooms.slice(this.rooms.indexOf(room), 1);

    return room;
  }
}
