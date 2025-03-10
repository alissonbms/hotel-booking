import Room from "@/entities/Room";
import IHttpClient from "@/infra/IHttpClient";
import IRoomsGateway from "./IRoomsGateway";

export default class RoomsHttpGateway implements IRoomsGateway {
  constructor(protected httpClient: IHttpClient, protected baseUrl: string) {}

  async getRooms(): Promise<Room[]> {
    const data = await this.httpClient.get(`${this.baseUrl}/rooms`);
    const rooms: Room[] = [];

    for (const room of data) {
      rooms.push(
        new Room(
          room.id,
          room.name,
          room.price,
          room.image,
          room.hasWifi,
          room.hasAir,
          room.hasKitchen,
          room.isPetFriendly,
          room.isAvailable,
        ),
      );
    }

    return rooms;
  }
  async getRoom(roomId: string): Promise<Room> {
    if (!roomId) {
      throw new Error("Invalid room ID");
    }

    const data: Room = await this.httpClient.get(
      `${this.baseUrl}/rooms/${roomId}`,
    );

    if (!data) {
      throw new Error("Room not found");
    }

    return data;
  }
  async setRoom(room: Room): Promise<Room> {
    if (!room.id || !room.name || !room.price || !room.image) {
      throw new Error(
        "Failed while trying to finish the room creation, seems some info are missing",
      );
    }

    const data: Room = await this.httpClient.post(
      `${this.baseUrl}/rooms`,
      room,
    );

    return data;
  }
  async updateRoom(editedRoom: Room): Promise<Room> {
    if (!editedRoom.id) {
      throw new Error("Invalid room ID");
    }

    const data: Room = await this.httpClient.put(
      `${this.baseUrl}/rooms/${editedRoom.id}`,
      editedRoom,
    );

    if (!data) {
      throw new Error("Room not found");
    }

    return data;
  }
  async deleteRoom(roomId: string): Promise<Room> {
    if (!roomId) {
      throw new Error("Invalid room ID");
    }

    const data: Room = await this.httpClient.get(
      `${this.baseUrl}/rooms/${roomId}`,
    );

    if (!data) {
      throw new Error("Room not found");
    }

    return data;
  }
}
