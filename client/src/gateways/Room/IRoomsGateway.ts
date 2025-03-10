import Room from "@/entities/Room";

export default interface IRoomsGateway {
  getRooms(): Promise<Room[]>;
  getRoom(roomId: string): Promise<Room>;
  setRoom(newRoom: Room): Promise<Room>;
  updateRoom(editedRoom: Room): Promise<Room>;
  deleteRoom(roomId: string): Promise<Room>;
}
