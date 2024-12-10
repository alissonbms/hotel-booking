import { InMemoryRoomRepository } from "../../../../test/repositories/in-memory-room-repository";
import { NotFoundError } from "../../../core/errors/custom-errors/not-found-error";
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

    expect(response.isRight()).toBe(true);
    expect(response?.value).toBeInstanceOf(Room);
  });

  test("Should not find any rooms and return null", async () => {
    const response = await useCase.handle({ id: "123" });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotFoundError);
  });
});
