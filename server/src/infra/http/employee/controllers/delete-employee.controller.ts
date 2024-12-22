import { DeleteEmployeeUseCase } from "@/domain/employee/use-cases/delete-employee";
import { EmployeePayload, LoggedEmployee } from "@/infra/auth/logged-employee";
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from "@nestjs/common";

@Controller("/employees/:id")
export class DeleteEmployeeController {
  constructor(private readonly deleteEmployee: DeleteEmployeeUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param("id") id: string,
    @LoggedEmployee() employee: EmployeePayload,
  ) {
    if (employee.id === id) {
      throw new BadRequestException("The employee is currently logged in");
    }
    const response = await this.deleteEmployee.handle({ id });

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message);
    }
  }
}
