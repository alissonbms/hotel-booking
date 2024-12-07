import { InMemoryBookingRepository } from "../../../../tests/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../../tests/repositories/in-memory-room-repository";
import Room from "../../employee/entities/room";
import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import Booking from "../entities/booking";
import { ListBookingsUseCase } from "./list-bookings";

let bookingRepository: InMemoryBookingRepository;
let roomRepository: InMemoryRoomRepository;
let useCase: ListBookingsUseCase;

describe("List bookings", () => {
  beforeEach(() => {
    bookingRepository = new InMemoryBookingRepository();
    roomRepository = new InMemoryRoomRepository();
    useCase = new ListBookingsUseCase(bookingRepository);
  });
  test("Should return a bookings array with one booking", async () => {
    const testRoom = Room.create({
      name: "other room",
      price: Money.create(1000),
      image: "room image",
    });

    roomRepository.rooms.push(testRoom);

    const booking = Booking.create({
      room: testRoom,
      customer: "Jess",
      days: 5,
      email: Email.create("jess@email.com"),
    });

    bookingRepository.bookings.push(booking);

    const bookings = await useCase.handle();

    expect(bookings).toHaveLength(1);
    expect(bookingRepository.bookings).toHaveLength(1);
  });
  test("Should return an empty bookings array", async () => {
    const bookings = await useCase.handle();

    expect(bookings).toHaveLength(0);
    expect(bookingRepository.bookings).toHaveLength(0);
  });
});
