import { InMemoryEmployeeRepository } from "../../../../tests/repositories/in-memory-employee-repository";
import Email from "../../shared/value-objects/email";
import Employee from "../entities/employee";
import { ListEmployeesUseCase } from "./list-employees";

let employeeRepository: InMemoryEmployeeRepository;
let useCase: ListEmployeesUseCase;

describe("List employees", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    useCase = new ListEmployeesUseCase(employeeRepository);
  });
  test("Should return a employees array with one employee", async () => {
    const employee = Employee.create({
      name: "Nichols",
      email: Email.create("nichols@email.com"),
      password: "nn123",
    });

    employeeRepository.employees.push(employee);

    const employees = await useCase.handle();

    expect(employees).toHaveLength(1);
    expect(employeeRepository.employees).toHaveLength(1);
  });
  test("Should return an empty employees array", async () => {
    const employees = await useCase.handle();

    expect(employees).toHaveLength(0);
    expect(employeeRepository.employees).toHaveLength(0);
  });
});
