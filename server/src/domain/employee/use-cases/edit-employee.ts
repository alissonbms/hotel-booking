import Email from "../../shared/value-objects/email";
import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";

type Request = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export class EditEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository,
  ) {}

  async handle(data: Request) {
    const employee = await this.employeeRepository.findById(data.id);

    if (!employee) {
      return null;
    }

    const emailOwner = await this.employeeRepository.findByEmail(data.email);

    if (emailOwner && emailOwner.id.toString() !== data.id) {
      return null;
    }

    const employeeEmail = Email.create(data.email);

    if (!employeeEmail.validate()) {
      return null;
    }

    const hashedPassword = await this.hashRepository.hash(data.password);

    employee.name = data.name;
    employee.email = employeeEmail;
    employee.password = hashedPassword;

    await this.employeeRepository.save(employee);
  }
}
