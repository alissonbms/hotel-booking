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
    const data: Room = await this.httpClient.get(
      `${this.baseUrl}/rooms/${roomId}`,
    );

    return data;
  }
  async setRoom(newRoom: Room): Promise<Room> {
    const data: Room = await this.httpClient.post(
      `${this.baseUrl}/rooms`,
      newRoom,
    );

    return data;
  }
  async updateRoom(editedRoom: Room): Promise<Room> {
    const data: Room = await this.httpClient.put(
      `${this.baseUrl}/rooms/${editedRoom.id}`,
      editedRoom,
    );

    return data;
  }
  async deleteRoom(roomId: string): Promise<Room> {
    const data: Room = await this.httpClient.get(
      `${this.baseUrl}/rooms/${roomId}`,
    );

    return data;
  }
}
