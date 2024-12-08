import { NotFoundError } from "../../../errors/custom-errors/not-found-error";
import { Either, left, right } from "../../../errors/either/either";
import Room from "../entities/room";
import { RoomRepository } from "../repositories/room-repository";

type Request = {
  id: string;
};

type Response = Either<NotFoundError, Room>;

export default class GetRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async handle({ id }: Request): Promise<Response> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      return left(new NotFoundError("Room"));
    }

    return right(room);
  }
}
