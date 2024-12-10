import { InMemoryBookingRepository } from "../../../../test/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../../test/repositories/in-memory-room-repository";
import { NotFoundError } from "../../../core/errors/custom-errors/not-found-error";
import Room from "../../employee/entities/room";
import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import Booking from "../entities/booking";
import GetBookingUseCase from "./get-booking";

let bookingRepository: InMemoryBookingRepository;
let roomRepository: InMemoryRoomRepository;
let useCase: GetBookingUseCase;

describe("Get booking", () => {
  beforeEach(() => {
    bookingRepository = new InMemoryBookingRepository();
    roomRepository = new InMemoryRoomRepository();
    useCase = new GetBookingUseCase(bookingRepository);
  });
  test("Should find a booking from the given ID", async () => {
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

    const response = await useCase.handle({ id: booking.id.toString() });

    expect(response).toBeDefined();
    expect(response.isRight()).toBe(true);
    expect(response.value).toBeInstanceOf(Booking);
    expect(bookingRepository.bookings[0]).toEqual(response.value);
    expect(bookingRepository.bookings[0].customer).toEqual("Jess");
    expect(bookingRepository.bookings[0].days).toEqual(5);
  });

  test("Should not find any bookings and return null", async () => {
    const response = await useCase.handle({ id: "123" });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotFoundError);
  });
});
