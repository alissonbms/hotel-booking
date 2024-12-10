import { InvalidFormatError } from "../../../core/errors/custom-errors/invalid-format-error";
import { NotAllowedError } from "../../../core/errors/custom-errors/not-allowed-error";
import { NotFoundError } from "../../../core/errors/custom-errors/not-found-error";
import { Either, left, right } from "../../../core/errors/either/either";
import Email from "../../shared/value-objects/email";
import Employee from "../entities/employee";
import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";

type Request = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type Response = Either<
  NotFoundError | NotAllowedError | InvalidFormatError,
  Employee
>;

export class EditEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository,
  ) {}

  async handle(data: Request): Promise<Response> {
    const employee = await this.employeeRepository.findById(data.id);

    if (!employee) {
      return left(new NotFoundError("Employee"));
    }

    const emailOwner = await this.employeeRepository.findByEmail(data.email);

    if (emailOwner && emailOwner.id.toString() !== data.id) {
      return left(new NotAllowedError("because email is already in use"));
    }

    const employeeEmail = Email.create(data.email);

    if (!employeeEmail.validate()) {
      return left(new InvalidFormatError("email"));
    }

    const hashedPassword = await this.hashRepository.hash(data.password);

    employee.name = data.name;
    employee.email = employeeEmail;
    employee.password = hashedPassword;

    await this.employeeRepository.save(employee);
    return right(employee);
  }
}
