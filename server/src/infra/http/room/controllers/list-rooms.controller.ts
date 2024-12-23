import { Controller, Get } from "@nestjs/common";
import { RoomPresenter } from "../../presenters/room-presenter";
import { ListRoomsUseCase } from "@/domain/employee/use-cases/list-rooms";
import { Public } from "@/infra/auth/public";

@Controller("/rooms")
@Public()
export class ListRoomsController {
  constructor(private readonly listRooms: ListRoomsUseCase) {}

  @Get()
  async handle() {
    const response = await this.listRooms.handle();

    return response.value.map(RoomPresenter.toHTTP);
  }
}
