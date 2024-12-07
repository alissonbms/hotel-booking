import { BookingRepository } from "../repositories/booking-repository";

export class ListBookingsUseCase {
  constructor(private bookingRepository: BookingRepository) {}

  async handle() {
    const bookings = await this.bookingRepository.findMany();
    return bookings;
  }
}
