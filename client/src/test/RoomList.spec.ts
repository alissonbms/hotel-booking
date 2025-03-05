import Room from "@/entities/Room";
import RoomList from "@/entities/RoomList";
import { faker } from "@faker-js/faker";

describe("Test the RoomList entity", () => {
  test("Should initiate as a empty rooms array", () => {
    const newRoomList = new RoomList();

    expect(newRoomList.getRooms()).toHaveLength(0);
  });
  test("Should add rooms to the rooms array", () => {
    const newRoomList = new RoomList();

    expect(newRoomList.getRooms()).toHaveLength(0);

    const rooms: Room[] = [
      {
        id: faker.database.collation(),
        name: faker.company.name(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        hasWifi: true,
        hasAir: true,
        hasKitchen: true,
        isPetFriendly: false,
        isAvailable: true,
      },
      {
        id: faker.database.collation(),
        name: faker.company.name(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        hasWifi: true,
        hasAir: true,
        hasKitchen: true,
        isPetFriendly: false,
        isAvailable: true,
      },
      {
        id: faker.database.collation(),
        name: faker.company.name(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        hasWifi: true,
        hasAir: true,
        hasKitchen: true,
        isPetFriendly: false,
        isAvailable: true,
      },
    ];

    newRoomList.setRooms(rooms);

    expect(newRoomList.getRooms()[0].name).toBe(rooms[0].name);
    expect(newRoomList.getRooms()).toHaveLength(3);
  });
  test("Should delete a valid room from the rooms array", () => {
    const newRoomList = new RoomList();

    expect(newRoomList.getRooms()).toHaveLength(0);

    const rooms: Room[] = [
      {
        id: faker.database.collation(),
        name: faker.company.name(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        hasWifi: true,
        hasAir: true,
        hasKitchen: true,
        isPetFriendly: false,
        isAvailable: true,
      },
      {
        id: faker.database.collation(),
        name: faker.company.name(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        hasWifi: true,
        hasAir: true,
        hasKitchen: true,
        isPetFriendly: false,
        isAvailable: true,
      },
      {
        id: faker.database.collation(),
        name: faker.company.name(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        hasWifi: true,
        hasAir: true,
        hasKitchen: true,
        isPetFriendly: false,
        isAvailable: true,
      },
    ];

    newRoomList.setRooms(rooms);
    expect(newRoomList.getRooms()).toHaveLength(3);

    newRoomList.deleteRoom(rooms[0]);
    expect(newRoomList.getRooms()[0].name).not.toBe(rooms[0].name);
    expect(newRoomList.getRooms()).toHaveLength(2);
  });
  test("Should NOT delete a invalid room from the rooms array", () => {
    try {
      const newRoomList = new RoomList();

      expect(newRoomList.getRooms()).toHaveLength(0);

      const rooms: Room[] = [
        {
          id: faker.database.collation(),
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
          image: faker.image.url(),
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: true,
        },
        {
          id: faker.database.collation(),
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
          image: faker.image.url(),
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: true,
        },
        {
          id: faker.database.collation(),
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
          image: faker.image.url(),
          hasWifi: true,
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: false,
          isAvailable: true,
        },
      ];

      newRoomList.setRooms(rooms);
      expect(newRoomList.getRooms()).toHaveLength(3);

      const unknownRoom: Room = {
        id: faker.database.collation(),
        name: faker.company.name(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        hasWifi: true,
        hasAir: true,
        hasKitchen: true,
        isPetFriendly: false,
        isAvailable: true,
      };

      newRoomList.deleteRoom(unknownRoom);
      expect(newRoomList.getRooms()).toHaveLength(3);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Room not found");
      }
    }
  });
});
