import { CreateEmployeeUseCase } from "@/domain/employee/use-cases/create-employee";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { CreateEmployeeDto } from "../dtos/create-employee-dto";
import { EmployeePresenter } from "../../presenters/employee-presenter";

@Controller("/employees")
export class CreateEmployeeController {
  constructor(private readonly createEmployee: CreateEmployeeUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateEmployeeDto) {
    const { name, email, password } = body;

    const response = await this.createEmployee.handle({
      name,
      email,
      password,
    });

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message);
    }

    return EmployeePresenter.toHTTP(response.value);
  }
}
