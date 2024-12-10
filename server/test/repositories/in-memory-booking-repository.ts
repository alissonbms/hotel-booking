import Booking from "../../src/domain/booking/entities/booking";
import { BookingRepository } from "../../src/domain/booking/repositories/booking-repository";

export class InMemoryBookingRepository implements BookingRepository {
  bookings: Booking[] = [];

  async create(booking: Booking) {
    this.bookings.push(booking);
    return booking;
  }

  async findMany() {
    return this.bookings;
  }

  async findById(id: string) {
    const booking = this.bookings.find((item) => item.id.toString() === id);

    if (!booking) {
      return null;
    }

    return booking;
  }

  async cancel(booking: Booking) {
    const itemIndex = this.bookings.findIndex(
      (item) => item.id.toString() === booking.id.toString(),
    );
    this.bookings[itemIndex] = booking;
  }

  async findByRoomId(roomId: string) {
    const booking = this.bookings.find(
      (item) => item.room.id.toString() === roomId,
    );

    if (!booking) {
      return null;
    }

    return booking;
  }
}
