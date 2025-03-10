import Booking from "@/entities/Booking";

export default interface IBookingsGateway {
  getBookings(): Promise<Booking[]>;
  getBooking(bookingId: string): Promise<Booking>;
  setBooking(booking: Booking): Promise<Booking>;
  cancelBooking(bookingId: string): Promise<Booking>;
}
