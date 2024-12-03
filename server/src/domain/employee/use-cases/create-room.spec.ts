import { InMemoryRoomRepository } from "../../../../tests/repositories/in-memory-room-repository";
import { CreateRoomUseCase } from "./create-room";

let roomRepository: InMemoryRoomRepository;
let useCase: CreateRoomUseCase;

describe("Room creation", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    useCase = new CreateRoomUseCase(roomRepository);
  });
  test("Should create a room", () => {
    const room = useCase.handle({
      name: "Amazing Room",
      price: 150,
      image: "amazingroom.png",
    });

    expect(room.name).toEqual("Amazing Room");
    expect(roomRepository.rooms[0].name).toEqual("Amazing Room");
  });
});
