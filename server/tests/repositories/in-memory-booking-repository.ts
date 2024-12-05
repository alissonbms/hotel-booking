import Booking from "../../src/domain/booking/entities/booking";
import { BookingRepository } from "../../src/domain/booking/repositories/booking-repository";

export class InMemoryBookingRepository implements BookingRepository {
  bookings: Booking[] = [];

  async create(booking: Booking) {
    this.bookings.push(booking);
    return booking;
  }
}
