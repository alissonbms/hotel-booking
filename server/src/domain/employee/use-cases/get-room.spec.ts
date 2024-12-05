import { InMemoryRoomRepository } from "../../../../tests/repositories/in-memory-room-repository";
import Money from "../../shared/value-objects/money";
import Room from "../entities/room";
import GetRoomUseCase from "./get-room";

let roomRepository: InMemoryRoomRepository;
let useCase: GetRoomUseCase;

describe("Get room", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    useCase = new GetRoomUseCase(roomRepository);
  });
  test("Should find a room from the given ID", async () => {
    const room = Room.create({
      name: "magnificent room",
      price: Money.create(2000),
      image: "magnificentroom.jpg",
      hasWifi: true,
      hasAir: true,
      hasKitchen: true,
      isPetFriendly: true,
      isAvailable: true,
    });

    roomRepository.rooms.push(room);

    const response = await useCase.handle({ id: room.id.toString() });

    expect(response).toBeDefined();
    expect(response?.name).toEqual("magnificent room");
  });

  test("Should not find any rooms and return null", async () => {
    const response = await useCase.handle({ id: "123" });

    expect(response).toBeNull();
  });
});
