import GetRoomUseCase from "@/domain/employee/use-cases/get-room";
import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { RoomPresenter } from "../../presenters/room-presenter";
import { Public } from "@/infra/auth/public";

@Controller("/rooms/:id")
@Public()
export class GetRoomController {
  constructor(private readonly getRoom: GetRoomUseCase) {}

  @Get()
  async handle(@Param("id") id: string) {
    const response = await this.getRoom.handle({ id });

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message);
    }

    return RoomPresenter.toHTTP(response.value);
  }
}
