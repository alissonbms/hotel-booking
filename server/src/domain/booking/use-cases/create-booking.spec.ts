import { InMemoryRoomRepository } from "../../../../tests/repositories/in-memory-room-repository";
import { InMemoryBookingRepository } from "../../../../tests/repositories/in-memory-booking-repository";
import { CreateBookingUseCase } from "./create-booking";
import Room from "../../employee/entities/room";
import Money from "../../shared/value-objects/money";
import Identity from "../../../core/entities/identity";

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
    const booking = await useCase.handle({
      roomId: "2",
      days: 10,
      customer: "John",
      email: "John@email.com",
    });

    expect(bookingRepository.bookings[0].id).toBeInstanceOf(Identity);
    expect(bookingRepository.bookings[0].id.toString()).toEqual(
      booking?.id.toString(),
    );
    expect(bookingRepository.bookings[0].room).toBeInstanceOf(Room);
    expect(bookingRepository.bookings[0].room.isAvailable).toEqual(false);
    expect(bookingRepository.bookings[0].days).toEqual(10);
    expect(bookingRepository.bookings[0].customer).toEqual("John");
    expect(bookingRepository.bookings[0].email.value).toEqual("John@email.com");
    expect(bookingRepository.bookings[0].isActive).toEqual(true);
  });
  test("Should NOT create a booking with a customer invalid email", async () => {
    const booking = await useCase.handle({
      roomId: "2",
      days: 10,
      customer: "John",
      email: "John@email",
    });

    expect(booking).toBeNull();
  });
  test("Should NOT create a booking for a non-existent room", async () => {
    const booking = await useCase.handle({
      roomId: "123",
      days: 10,
      customer: "John",
      email: "John@email.com",
    });

    expect(booking).toBeNull();
  });
  test("Should NOT create a reservation for a room that is already booked", async () => {
    const booking = await useCase.handle({
      roomId: "3",
      days: 10,
      customer: "John",
      email: "John@email.com",
    });

    expect(booking).toBeNull();
  });
});
