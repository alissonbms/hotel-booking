import GetEmployeeUseCase from "@/domain/employee/use-cases/get-employee";
import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { EmployeePresenter } from "../../presenters/employee-presenter";

@Controller("/employees/:id")
export class GetEmployeeController {
  constructor(private readonly getEmployee: GetEmployeeUseCase) {}

  @Get()
  async handle(@Param("id") id: string) {
    const response = await this.getEmployee.handle({ id });

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message);
    }

    return EmployeePresenter.toHTTP(response.value);
  }
}
