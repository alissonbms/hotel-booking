import Booking from "../entities/booking";

export abstract class BookingRepository {
  abstract create(booking: Booking): Promise<Booking>;
}
