import { InMemoryRoomRepository } from "../../../../tests/repositories/in-memory-room-repository";
import Money from "../../shared/value-objects/money";
import Room from "../entities/room";
import { ListRoomsUseCase } from "./list-rooms";

let roomRepository: InMemoryRoomRepository;
let useCase: ListRoomsUseCase;

describe("List rooms", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    useCase = new ListRoomsUseCase(roomRepository);
  });
  test("Should return a rooms array with one room", async () => {
    const room = Room.create({
      name: "awesome room",
      price: Money.create(2000),
      image: "awesomeroom.jpg",
      hasWifi: true,
      hasAir: true,
      hasKitchen: true,
      isPetFriendly: true,
      isAvailable: true,
    });

    roomRepository.rooms.push(room);

    const rooms = await useCase.handle();

    expect(rooms).toHaveLength(1);
    expect(roomRepository.rooms).toHaveLength(1);
  });
  test("Should return an empty rooms array", async () => {
    const rooms = await useCase.handle();

    expect(rooms).toHaveLength(0);
    expect(roomRepository.rooms).toHaveLength(0);
  });
});
