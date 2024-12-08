import { InMemoryRoomRepository } from "../../../../tests/repositories/in-memory-room-repository";
import { NotFoundError } from "../../../errors/custom-errors/not-found-error";
import Money from "../../shared/value-objects/money";
import Room from "../entities/room";
import { EditRoomUseCase } from "./edit-room";

let roomRepository: InMemoryRoomRepository;
let useCase: EditRoomUseCase;

describe("Edit room", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    useCase = new EditRoomUseCase(roomRepository);
  });
  test("Should edit the room correctly", async () => {
    const room = Room.create({
      name: "Another room",
      price: Money.create(3578),
      image: "another room image",
    });

    roomRepository.rooms.push(room);

    const response = await useCase.handle({
      id: room.id.toString(),
      name: "Edited name",
      price: 29345,
      image: "edited image",
      hasAir: room.hasAir,
      hasKitchen: true,
      hasWifi: true,
      isPetFriendly: true,
      isAvailable: false,
    });

    expect(response.isRight()).toBe(true);
    expect(response.value).toBeInstanceOf(Room);
    expect(roomRepository.rooms[0].name).toEqual("Edited name");
    expect(roomRepository.rooms[0].price.value).toEqual(29345);
    expect(roomRepository.rooms[0].price.formattedPriceUSD()).toEqual(
      "$29,345.00",
    );
    expect(roomRepository.rooms[0].hasAir).toEqual(false);
    expect(roomRepository.rooms[0].hasKitchen).toEqual(true);
    expect(roomRepository.rooms[0].hasWifi).toEqual(true);
    expect(roomRepository.rooms[0].isPetFriendly).toEqual(true);
    expect(roomRepository.rooms[0].isAvailable).toEqual(false);
  });
  test("Should not find any rooms and return null", async () => {
    const response = await useCase.handle({
      id: "123",
      name: "Edited name",
      price: 29345,
      image: "edited image",
      hasAir: false,
      hasKitchen: true,
      hasWifi: true,
      isPetFriendly: true,
      isAvailable: false,
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotFoundError);
  });
});
