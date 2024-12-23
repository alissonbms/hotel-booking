import Booking from "@/domain/booking/entities/booking";
import { RoomPresenter } from "./room-presenter";

export class BookingPresenter {
  static toHTTP(booking: Booking) {
    return {
      id: booking.id.toString(),
      room: RoomPresenter.toHTTP(booking.room),
      days: booking.days,
      customer: booking.room,
      email: booking.email,
      isActive: booking.isActive,
    };
  }
}
