import Booking from "./Booking";

export default class BookingList {
  private bookings: Booking[];

  constructor() {
    this.bookings = [];
  }

  getBookings() {
    return this.bookings;
  }

  setBookings(bookings: Booking[]) {
    for (const booking of bookings) {
      this.bookings.push(
        new Booking(
          booking.id,
          booking.room,
          booking.days,
          booking.customer,
          booking.email,
          booking.isActive,
        ),
      );
    }

    return this.bookings;
  }

  deleteBooking(booking: Booking) {
    const existingBooking = this.bookings.find((r) => r.id === booking.id);

    if (!existingBooking) {
      throw new Error("Booking not found");
    }

    this.bookings.splice(this.bookings.indexOf(existingBooking), 1);
  }
}
