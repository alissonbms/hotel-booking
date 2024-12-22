import { NotFoundError } from "@/core/errors/custom-errors/not-found-error";
import { EditEmployeeUseCase } from "@/domain/employee/use-cases/edit-employee";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from "@nestjs/common";
import { EditEmployeeDto } from "../dtos/edit-employee.dto";

@Controller("/employees/:id")
export class EditEmployeeController {
  constructor(private readonly editEmployee: EditEmployeeUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(@Body() body: EditEmployeeDto, @Param("id") id: string) {
    const { name, email, password } = body;

    const response = await this.editEmployee.handle({
      id,
      name,
      email,
      password,
    });

    if (response.isLeft()) {
      if (response.value.constructor === NotFoundError) {
        throw new NotFoundException(response.value.message);
      }

      throw new BadRequestException(response.value.message);
    }
  }
}
