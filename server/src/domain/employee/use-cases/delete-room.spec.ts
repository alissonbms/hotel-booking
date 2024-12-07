import { InMemoryBookingRepository } from "../../../../tests/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../../tests/repositories/in-memory-room-repository";
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

    await useCase.handle({ id: testRoom.id.toString() });
    expect(roomRepository.rooms[0]).toBeUndefined();
    expect(roomRepository.rooms).toHaveLength(0);
  });
  test("Should not find any rooms and return null", async () => {
    const response = await useCase.handle({ id: "123" });

    expect(response).toBeNull();
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

    expect(response).toBeNull();
    expect(roomRepository.rooms).toHaveLength(1);
    expect(bookingRepository.bookings).toHaveLength(1);
  });
});
