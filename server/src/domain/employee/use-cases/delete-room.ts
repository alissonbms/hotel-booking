import { NotAllowedError } from "../../../errors/custom-errors/not-allowed-error";
import { NotFoundError } from "../../../errors/custom-errors/not-found-error";
import { Either, left, right } from "../../../errors/either/either";
import { BookingRepository } from "../../booking/repositories/booking-repository";
import { RoomRepository } from "../repositories/room-repository";

type Request = {
  id: string;
};

type Response = Either<NotFoundError | NotAllowedError, string>;

export class DeleteRoomUseCase {
  constructor(
    private roomRepository: RoomRepository,
    private bookingRepository: BookingRepository,
  ) {}

  async handle({ id }: Request): Promise<Response> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      return left(new NotFoundError("Room"));
    }

    const bookingExists = await this.bookingRepository.findByRoomId(
      room.id.toString(),
    );

    if (bookingExists) {
      return left(
        new NotAllowedError("because is a booking registered for this room"),
      );
    }

    await this.roomRepository.delete(id);

    return right("Room deleted successfully");
  }
}
