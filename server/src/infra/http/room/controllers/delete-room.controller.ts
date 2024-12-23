import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from "@nestjs/common";
import { DeleteRoomUseCase } from "@/domain/employee/use-cases/delete-room";
import { NotFoundError } from "@/core/errors/custom-errors/not-found-error";

@Controller("/rooms/:id")
export class DeleteRoomController {
  constructor(private readonly deleteRoom: DeleteRoomUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    const response = await this.deleteRoom.handle({ id });

    if (response.isLeft()) {
      if (response.value.constructor === NotFoundError) {
        throw new NotFoundException(response.value.message);
      }

      throw new BadRequestException(response.value.message);
    }
  }
}
