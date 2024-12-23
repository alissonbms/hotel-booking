import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from "@nestjs/common";
import { EditRoomUseCase } from "@/domain/employee/use-cases/edit-room";
import { EditRoomDto } from "../dtos/edit-room.dto";

@Controller("/rooms/:id")
export class EditRoomController {
  constructor(private readonly editRoom: EditRoomUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(@Body() body: EditRoomDto, @Param("id") id: string) {
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

    const response = await this.editRoom.handle({
      id,
      name,
      price,
      image,
      hasAir,
      hasWifi,
      hasKitchen,
      isAvailable,
      isPetFriendly,
    });

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message);
    }
  }
}
