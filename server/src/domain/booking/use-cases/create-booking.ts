import { InvalidFormatError } from "../../../core/errors/custom-errors/invalid-format-error";
import { NotFoundError } from "../../../core/errors/custom-errors/not-found-error";
import { RoomAlreadyBookedError } from "../../../core/errors/custom-errors/room-already-booked-error";
import { Either, left, right } from "../../../core/errors/either/either";
import { RoomRepository } from "../../employee/repositories/room-repository";
import Email from "../../shared/value-objects/email";
import Booking from "../entities/booking";
import { BookingRepository } from "../repositories/booking-repository";

type Request = {
  roomId: string;
  days: number;
  customer: string;
  email: string;
  isActive?: boolean;
};

type Response = Either<
  NotFoundError | RoomAlreadyBookedError | InvalidFormatError,
  Booking
>;

export class CreateBookingUseCase {
  constructor(
    private roomRepository: RoomRepository,
    private bookingRepository: BookingRepository,
  ) {}

  async handle(data: Request): Promise<Response> {
    const roomExists = await this.roomRepository.findById(data.roomId);

    if (!roomExists) {
      return left(new NotFoundError("Room"));
    }

    if (!roomExists.isAvailable) {
      return left(new RoomAlreadyBookedError());
    }

    const customerEmail = Email.create(data.email);

    if (!customerEmail.validate()) {
      return left(new InvalidFormatError("email"));
    }

    const booking = Booking.create({
      ...data,
      room: roomExists,
      email: customerEmail,
    });

    await this.bookingRepository.create(booking);

    roomExists.isAvailable = false;

    await this.roomRepository.save(roomExists);

    return right(booking);
  }
}
