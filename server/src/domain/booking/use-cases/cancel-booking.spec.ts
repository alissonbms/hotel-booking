import { InMemoryBookingRepository } from "../../../../tests/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../../tests/repositories/in-memory-room-repository";
import { NotFoundError } from "../../../errors/custom-errors/not-found-error";
import Room from "../../employee/entities/room";
import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import Booking from "../entities/booking";
import { CancelBookingUseCase } from "./cancel-booking";

let bookingRepository: InMemoryBookingRepository;
let roomRepository: InMemoryRoomRepository;
let useCase: CancelBookingUseCase;

describe("Cancel booking", () => {
  beforeEach(() => {
    bookingRepository = new InMemoryBookingRepository();
    roomRepository = new InMemoryRoomRepository();
    useCase = new CancelBookingUseCase(bookingRepository, roomRepository);
  });

  test("Should cancel a booking", async () => {
    const testRoom = Room.create({
      name: "other room",
      price: Money.create(1000),
      image: "room image",
      isAvailable: false,
    });

    roomRepository.rooms.push(testRoom);

    const booking = Booking.create({
      room: testRoom,
      customer: "Jess",
      days: 5,
      email: Email.create("jess@email.com"),
    });

    bookingRepository.bookings.push(booking);

    const response = await useCase.handle({ bookingId: booking.id.toString() });

    expect(response.isRight()).toBe(true);
    expect(response.value).toBeInstanceOf(Booking);
    expect(bookingRepository.bookings[0].isActive).toEqual(false);
    expect(roomRepository.rooms[0].isAvailable).toEqual(true);
  });
  test("Should not find any bookings and return null", async () => {
    const response = await useCase.handle({ bookingId: "123" });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotFoundError);
  });
});
