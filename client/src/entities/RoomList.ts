import Room from "./Room";

export default class RoomList {
  private rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  getRooms() {
    return this.rooms;
  }

  setRooms(rooms: Room[]) {
    for (const room of rooms) {
      this.rooms.push(
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

    return this.rooms;
  }

  deleteRoom(room: Room) {
    const existingRoom = this.rooms.find((r) => r.id === room.id);

    if (!existingRoom) {
      throw new Error("Room not found");
    }

    this.rooms.splice(this.rooms.indexOf(existingRoom), 1);
  }
}
