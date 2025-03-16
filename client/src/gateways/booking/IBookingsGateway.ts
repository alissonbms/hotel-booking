import Booking from "@/entities/Booking";
import { BookingUnion } from "../../../types/BookingUnion";

export default interface IBookingsGateway {
  getBookings(): Promise<Booking[]>;
  getBooking(bookingId: string): Promise<Booking>;
  setBooking(booking: BookingUnion): Promise<Booking>;
  cancelBooking(bookingId: string): Promise<Booking>;
}
