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

export class CreateBookingUseCase {
  constructor(
    private roomRepository: RoomRepository,
    private bookingRepository: BookingRepository,
  ) {}

  async handle(data: Request) {
    const roomExists = await this.roomRepository.findById(data.roomId);

    if (!roomExists) {
      return null;
    }

    if (!roomExists.isAvailable) {
      return null;
    }

    const customerEmail = Email.create(data.email);

    if (!customerEmail.validate()) {
      return null;
    }

    const booking = Booking.create({
      ...data,
      room: roomExists,
      email: customerEmail,
    });

    await this.bookingRepository.create(booking);

    roomExists.isAvailable = false;

    await this.roomRepository.save(roomExists);

    return booking;
  }
}
