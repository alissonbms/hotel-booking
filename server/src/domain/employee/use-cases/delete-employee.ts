import { EmployeeRepository } from "../repositories/employee-repository";

type Request = {
  id: string;
};

export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async handle({ id }: Request) {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      return null;
    }

    await this.employeeRepository.delete(id);
  }
}
