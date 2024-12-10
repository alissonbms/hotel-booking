import { InMemoryRoomRepository } from "../../../../test/repositories/in-memory-room-repository";
import { InMemoryBookingRepository } from "../../../../test/repositories/in-memory-booking-repository";
import { CreateBookingUseCase } from "./create-booking";
import Room from "../../employee/entities/room";
import Money from "../../shared/value-objects/money";
import Identity from "../../../core/entities/identity";
import Booking from "../entities/booking";
import { InvalidFormatError } from "../../../core/errors/custom-errors/invalid-format-error";
import { NotFoundError } from "../../../core/errors/custom-errors/not-found-error";
import { RoomAlreadyBookedError } from "../../../core/errors/custom-errors/room-already-booked-error";

let roomRepository: InMemoryRoomRepository;
let bookingRepository: InMemoryBookingRepository;
let useCase: CreateBookingUseCase;

describe("Create booking", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository();
    useCase = new CreateBookingUseCase(roomRepository, bookingRepository);

    const room = Room.create(
      {
        name: "normal room",
        price: Money.create(1900),
        image: "normal room image",
      },
      new Identity("2"),
    );

    const bookedRoom = Room.create(
      {
        name: "booked room",
        price: Money.create(2800),
        image: "booked room image",
        isAvailable: false,
      },
      new Identity("3"),
    );

    roomRepository.rooms.push(room);
    roomRepository.rooms.push(bookedRoom);
  });

  test("Should create a booking", async () => {
    const response = await useCase.handle({
      roomId: "2",
      days: 10,
      customer: "John",
      email: "John@email.com",
    });

    expect(response.isRight()).toBe(true);
    expect(response.value).toBeInstanceOf(Booking);
    expect(bookingRepository.bookings[0]).toEqual(response.value);
    expect(bookingRepository.bookings[0].id).toBeInstanceOf(Identity);
    expect(bookingRepository.bookings[0].room).toBeInstanceOf(Room);
    expect(bookingRepository.bookings[0].room.isAvailable).toEqual(false);
    expect(bookingRepository.bookings[0].days).toEqual(10);
    expect(bookingRepository.bookings[0].customer).toEqual("John");
    expect(bookingRepository.bookings[0].email.value).toEqual("John@email.com");
    expect(bookingRepository.bookings[0].isActive).toEqual(true);
  });
  test("Should NOT create a booking with a customer invalid email", async () => {
    const response = await useCase.handle({
      roomId: "2",
      days: 10,
      customer: "John",
      email: "John@email",
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(InvalidFormatError);
  });
  test("Should NOT create a booking for a non-existent room", async () => {
    const response = await useCase.handle({
      roomId: "123",
      days: 10,
      customer: "John",
      email: "John@email.com",
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotFoundError);
  });
  test("Should NOT create a reservation for a room that is already booked", async () => {
    const response = await useCase.handle({
      roomId: "3",
      days: 10,
      customer: "John",
      email: "John@email.com",
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(RoomAlreadyBookedError);
  });
});
