import IHttpClient from "@/infra/IHttpClient";
import Booking from "@/entities/Booking";
import IBookingsGateway from "./IBookingsGateway";

export default class BookingsHttpGateway implements IBookingsGateway {
  constructor(protected httpClient: IHttpClient, protected baseUrl: string) {}

  async getBookings(): Promise<Booking[]> {
    const data = await this.httpClient.get(`${this.baseUrl}/bookings`);

    const bookings: Booking[] = [];

    for (const booking of data) {
      bookings.push(
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

    return bookings;
  }
  async getBooking(bookingId: string): Promise<Booking> {
    if (!bookingId) {
      throw new Error("Invalid booking ID");
    }

    const data: Booking = await this.httpClient.get(
      `${this.baseUrl}/bookings/${bookingId}`,
    );

    if (!data) {
      throw new Error("Booking not found");
    }

    return data;
  }
  async setBooking(booking: Booking): Promise<Booking> {
    if (
      !booking.id ||
      !booking.room ||
      !booking.days ||
      !booking.customer ||
      !booking.email
    ) {
      throw new Error(
        "Failed while trying to finish the booking, seems some info are missing",
      );
    }

    const data: Booking = await this.httpClient.post(
      `${this.baseUrl}/bookings`,
      booking,
    );

    return data;
  }
  async cancelBooking(bookingId: string): Promise<Booking> {
    if (!bookingId) {
      throw new Error("Invalid booking ID");
    }

    const data: Booking = await this.httpClient.patch(
      `${this.baseUrl}/bookings/${bookingId}`,
      {},
    );

    if (!data) {
      throw new Error("Booking not found");
    }

    return data;
  }
}
