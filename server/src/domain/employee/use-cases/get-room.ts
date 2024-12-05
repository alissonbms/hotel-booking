import { RoomRepository } from "../repositories/room-repository";

type Request = {
  id: string;
};

export default class GetRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async handle({ id }: Request) {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      return null;
    }

    return room;
  }
}
