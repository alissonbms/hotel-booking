import { InMemoryRoomRepository } from "../../../../test/repositories/in-memory-room-repository";
import Identity from "../../../core/entities/identity";
import Room from "../entities/room";
import { CreateRoomUseCase } from "./create-room";

let roomRepository: InMemoryRoomRepository;
let useCase: CreateRoomUseCase;

describe("Room creation", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    useCase = new CreateRoomUseCase(roomRepository);
  });
  test("Should create a room", async () => {
    const response = await useCase.handle({
      name: "Amazing Room",
      price: 1500,
      image: "amazingroom.png",
    });

    expect(response.isRight()).toBe(true);
    expect(response.value).toBeInstanceOf(Room);
    expect(roomRepository.rooms[0]).toEqual(response.value);
    expect(roomRepository.rooms[0].id).toBeInstanceOf(Identity);
    expect(roomRepository.rooms[0].id.toString()).toEqual(
      response.value?.id.toString(),
    );
    expect(roomRepository.rooms[0].name).toEqual("Amazing Room");
    expect(roomRepository.rooms[0].price.value).toEqual(1500);
    expect(roomRepository.rooms[0].price.formattedPriceUSD()).toEqual(
      "$1,500.00",
    );
    expect(roomRepository.rooms[0].image).toEqual("amazingroom.png");
    expect(roomRepository.rooms[0].hasWifi).toEqual(false);
    expect(roomRepository.rooms[0].hasAir).toEqual(false);
    expect(roomRepository.rooms[0].hasKitchen).toEqual(false);
    expect(roomRepository.rooms[0].isPetFriendly).toEqual(false);
    expect(roomRepository.rooms[0].isAvailable).toEqual(true);
  });
});
