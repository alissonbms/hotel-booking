import { CreateEmployeeUseCase } from "@/domain/employee/use-cases/create-employee";
import { BadRequestException, Body, Controller, Post } from "@nestjs/common";

@Controller("/employees")
export class CreateEmployeeController {
  constructor(private readonly createEmployee: CreateEmployeeUseCase) {}

  @Post()
  async handle(@Body() body) {
    const { name, email, password } = body;

    const response = await this.createEmployee.handle({
      name,
      email,
      password,
    });

    if (response.isLeft()) {
      return new BadRequestException(response.value.message);
    }

    return response.value;
  }
}
