import { InMemoryBookingRepository } from "../../../../tests/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../../tests/repositories/in-memory-room-repository";
import { NotAllowedError } from "../../../errors/custom-errors/not-allowed-error";
import { NotFoundError } from "../../../errors/custom-errors/not-found-error";
import Booking from "../../booking/entities/booking";
import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import Room from "../entities/room";
import { DeleteRoomUseCase } from "./delete-room";

let roomRepository: InMemoryRoomRepository;
let bookingRepository: InMemoryBookingRepository;
let useCase: DeleteRoomUseCase;

describe("Delete a room", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository();
    useCase = new DeleteRoomUseCase(roomRepository, bookingRepository);
  });
  test("Should delete a room", async () => {
    const testRoom = Room.create({
      name: "other room",
      price: Money.create(1000),
      image: "room image",
      isAvailable: true,
    });

    roomRepository.rooms.push(testRoom);
    expect(roomRepository.rooms[0]).toBeDefined();
    expect(roomRepository.rooms).toHaveLength(1);

    const response = await useCase.handle({ id: testRoom.id.toString() });
    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual("Room deleted successfully");
    expect(roomRepository.rooms[0]).toBeUndefined();
    expect(roomRepository.rooms).toHaveLength(0);
  });
  test("Should not find any rooms and return null", async () => {
    const response = await useCase.handle({ id: "123" });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotFoundError);
  });
  test("Should NOT delete a room with a booking", async () => {
    const testRoom = Room.create({
      name: "other room",
      price: Money.create(1000),
      image: "room image",
      isAvailable: false,
    });

    roomRepository.rooms.push(testRoom);
    expect(roomRepository.rooms[0]).toBeDefined();
    expect(roomRepository.rooms).toHaveLength(1);

    const booking = Booking.create({
      room: testRoom,
      customer: "Jess",
      days: 5,
      email: Email.create("jess@email.com"),
    });

    bookingRepository.bookings.push(booking);
    expect(bookingRepository.bookings[0]).toBeDefined();
    expect(bookingRepository.bookings).toHaveLength(1);

    const response = await useCase.handle({ id: testRoom.id.toString() });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotAllowedError);
    expect(roomRepository.rooms).toHaveLength(1);
    expect(bookingRepository.bookings).toHaveLength(1);
  });
});
