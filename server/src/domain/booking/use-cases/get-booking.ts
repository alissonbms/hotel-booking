import { NotFoundError } from "../../../errors/custom-errors/not-found-error";
import { Either, left, right } from "../../../errors/either/either";
import Booking from "../entities/booking";
import { BookingRepository } from "../repositories/booking-repository";

type Request = {
  id: string;
};

type Response = Either<NotFoundError, Booking>;

export default class GetBookingUseCase {
  constructor(private bookingRepository: BookingRepository) {}

  async handle({ id }: Request): Promise<Response> {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      return left(new NotFoundError("Booking"));
    }

    return right(booking);
  }
}
