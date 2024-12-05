import Room from "../../src/domain/employee/entities/room";
import { RoomRepository } from "../../src/domain/employee/repositories/room-repository";

export class InMemoryRoomRepository implements RoomRepository {
  rooms: Room[] = [];

  async create(room: Room) {
    this.rooms.push(room);
    return room;
  }

  async findMany() {
    return this.rooms;
  }

  async findById(id: string) {
    const room = this.rooms.find((item) => item.id.toString() === id);

    if (!room) {
      return null;
    }

    return room;
  }

  async save(room: Room) {
    const itemIndex = this.rooms.findIndex((item) => item.id === room.id);
    this.rooms[itemIndex] = room;
  }
}
