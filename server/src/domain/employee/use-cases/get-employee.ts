import { NotFoundError } from "../../../errors/custom-errors/not-found-error";
import { Either, left, right } from "../../../errors/either/either";
import Employee from "../entities/employee";
import { EmployeeRepository } from "../repositories/employee-repository";

type Request = {
  id: string;
};

type Response = Either<NotFoundError, Employee>;

export default class GetEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async handle({ id }: Request): Promise<Response> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      return left(new NotFoundError("Employee"));
    }

    return right(employee);
  }
}
