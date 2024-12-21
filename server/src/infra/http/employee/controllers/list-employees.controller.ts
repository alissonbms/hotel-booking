import { ListEmployeesUseCase } from "@/domain/employee/use-cases/list-employees";
import { Controller, Get } from "@nestjs/common";
import { EmployeePresenter } from "../../presenters/employee-presenter";

@Controller("/employees")
export class ListEmployeesController {
  constructor(private readonly listEmployees: ListEmployeesUseCase) {}

  @Get()
  async handle() {
    const response = await this.listEmployees.handle();

    return response.value.map(EmployeePresenter.toHTTP);
  }
}
