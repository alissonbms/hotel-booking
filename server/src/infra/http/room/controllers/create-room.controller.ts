import { CreateRoomUseCase } from "@/domain/employee/use-cases/create-room";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateRoomDto } from "../dtos/create-room.dto";
import { RoomPresenter } from "../../presenters/room-presenter";

@Controller("/rooms")
export class CreateRoomController {
  constructor(private readonly createRoom: CreateRoomUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateRoomDto) {
    const {
      name,
      price,
      image,
      hasAir,
      hasWifi,
      hasKitchen,
      isAvailable,
      isPetFriendly,
    } = body;

    const response = await this.createRoom.handle({
      name,
      price,
      image,
      hasAir,
      hasWifi,
      hasKitchen,
      isAvailable,
      isPetFriendly,
    });

    return RoomPresenter.toHTTP(response.value);
  }
}
