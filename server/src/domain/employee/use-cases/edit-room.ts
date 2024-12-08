import { NotFoundError } from "../../../errors/custom-errors/not-found-error";
import { Either, left, right } from "../../../errors/either/either";
import Money from "../../shared/value-objects/money";
import Room from "../entities/room";
import { RoomRepository } from "../repositories/room-repository";

type Request = {
  id: string;
  name: string;
  price: number;
  image: string;
  hasWifi: boolean;
  hasAir: boolean;
  hasKitchen: boolean;
  isPetFriendly: boolean;
  isAvailable: boolean;
};

type Response = Either<NotFoundError, Room>;

export class EditRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async handle(data: Request): Promise<Response> {
    const room = await this.roomRepository.findById(data.id);

    if (!room) {
      return left(new NotFoundError("Room"));
    }

    const roomPrice = Money.create(data.price);

    room.name = data.name;
    room.price = roomPrice;
    room.image = data.image;
    room.hasWifi = data.hasWifi;
    room.hasAir = data.hasAir;
    room.hasKitchen = data.hasKitchen;
    room.isPetFriendly = data.isPetFriendly;
    room.isAvailable = data.isAvailable;

    await this.roomRepository.save(room);

    return right(room);
  }
}
