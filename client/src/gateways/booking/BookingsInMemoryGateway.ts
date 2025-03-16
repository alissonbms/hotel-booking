import Booking from "@/entities/Booking";
import IBookingsGateway from "./IBookingsGateway";
import { BookingUnion } from "../../../types/BookingUnion";

export class BookingsInMemoryGateway implements IBookingsGateway {
  protected bookings: Booking[];
  constructor(bookings: Booking[]) {
    this.bookings = bookings;
  }

  async getBookings(): Promise<Booking[]> {
    return this.bookings;
  }

  async getBooking(bookingId: string): Promise<Booking> {
    if (!bookingId) {
      throw new Error("Invalid booking ID");
    }

    const booking = this.bookings.find((b) => b.id === bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  }
  async setBooking(booking: Extract<BookingUnion, Booking>): Promise<Booking> {
    if (!booking.days || !booking.customer || !booking.email) {
      throw new Error(
        "Failed while trying to finish the booking, seems some info are missing",
      );
    }
    const newBooking = new Booking(
      booking.id,
      booking.room,
      booking.days,
      booking.customer,
      booking.email,
      booking.isActive,
    );

    this.bookings.push(newBooking);

    return newBooking;
  }
  async cancelBooking(bookingId: string): Promise<Booking> {
    if (!bookingId) {
      throw new Error("Invalid booking ID");
    }

    const booking = this.bookings.find((b) => b.id === bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    const bookingIndex = this.bookings.indexOf(booking);

    this.bookings[bookingIndex] = { ...booking, isActive: false };

    return booking;
  }
}
