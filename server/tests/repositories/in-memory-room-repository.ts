import Room from "../../src/domain/employee/entities/room";
import { RoomRepository } from "../../src/domain/employee/repositories/room-repository";

export class InMemoryRoomRepository implements RoomRepository {
  rooms: Room[] = [];

  create(room: Room) {
    this.rooms.push(room);
    return room;
  }
}
