import Room from "../entities/room";

export abstract class RoomRepository {
  abstract create(room: Room): Promise<Room>;
  abstract findMany(): Promise<Room[]>;
  abstract findById(id: string): Promise<Room | null>;
}
