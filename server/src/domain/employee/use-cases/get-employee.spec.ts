import { InMemoryEmployeeRepository } from "../../../../test/repositories/in-memory-employee-repository";
import Email from "../../shared/value-objects/email";
import Employee from "../entities/employee";
import GetEmployeeUseCase from "./get-employee";
import { NotFoundError } from "../../../core/errors/custom-errors/not-found-error";

let employeeRepository: InMemoryEmployeeRepository;
let useCase: GetEmployeeUseCase;

describe("Get employee", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    useCase = new GetEmployeeUseCase(employeeRepository);
  });
  test("Should find a employee from the given ID", async () => {
    const employee = Employee.create({
      name: "Nichols Jammerson",
      email: Email.create("nicholsjam@email.com"),
      password: "nn123jam",
    });

    employeeRepository.employees.push(employee);

    const response = await useCase.handle({ id: employee.id.toString() });

    expect(response).toBeDefined();
    expect(response.isRight()).toBe(true);
    expect(response.value).toBeInstanceOf(Employee);
    expect(response?.value.name).toEqual("Nichols Jammerson");
  });

  test("Should not find any employees and return null", async () => {
    const response = await useCase.handle({ id: "123" });

    expect(response).toBeDefined();
    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotFoundError);
  });
});
