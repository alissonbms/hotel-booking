import { InMemoryEmployeeRepository } from "../../../../tests/repositories/in-memory-employee-repository";
import { HashSimulator } from "../../../../tests/services/hash-simulator";
import Identity from "../../../core/entities/identity";
import { InvalidFormatError } from "../../../errors/custom-errors/invalid-format-error";
import { NotAllowedError } from "../../../errors/custom-errors/not-allowed-error";
import Email from "../../shared/value-objects/email";
import Employee from "../entities/employee";
import { CreateEmployeeUseCase } from "./create-employee";

let employeeRepository: InMemoryEmployeeRepository;
let hashRepository: HashSimulator;
let useCase: CreateEmployeeUseCase;

describe("Employee creation", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    hashRepository = new HashSimulator();
    useCase = new CreateEmployeeUseCase(employeeRepository, hashRepository);
  });
  test("Should create a employee", async () => {
    const response = await useCase.handle({
      name: "Nichols",
      email: "nichols@email.com",
      password: "nn123",
    });

    const hashedPassword = await hashRepository.hash("nn123");

    expect(response.isRight()).toBe(true);
    expect(response.value).toBeInstanceOf(Employee);
    expect(employeeRepository.employees[0]).toEqual(response.value);
    expect(employeeRepository.employees[0].id).toBeInstanceOf(Identity);
    expect(employeeRepository.employees[0].name).toEqual("Nichols");
    expect(employeeRepository.employees[0].email.value).toEqual(
      "nichols@email.com",
    );
    expect(employeeRepository.employees[0].password).toEqual(hashedPassword);
  });
  test("Should NOT create a employee with an invalid email", async () => {
    const response = await useCase.handle({
      name: "Nichols",
      email: "nichols@email",
      password: "nn123",
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(InvalidFormatError);
  });
  test("Should NOT create a employee with email already in use", async () => {
    const employee = Employee.create({
      name: "Nichols",
      email: Email.create("nichols@email.com"),
      password: "nn123",
    });

    employeeRepository.employees.push(employee);

    const response = await useCase.handle({
      name: "Jaime",
      email: "nichols@email.com",
      password: "jj456",
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotAllowedError);
    expect(employeeRepository.employees[0].name).toEqual("Nichols");
    expect(employeeRepository.employees).toHaveLength(1);
  });
});
