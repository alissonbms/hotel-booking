import { InMemoryEmployeeRepository } from "../../../../tests/repositories/in-memory-employee-repository";
import { HashSimulator } from "../../../../tests/services/hash-simulator";
import Email from "../../shared/value-objects/email";
import Employee from "../entities/employee";
import { EditEmployeeUseCase } from "./edit-employee";

let employeeRepository: InMemoryEmployeeRepository;
let hashRepository: HashSimulator;
let useCase: EditEmployeeUseCase;

describe("Edit employee", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    hashRepository = new HashSimulator();
    useCase = new EditEmployeeUseCase(employeeRepository, hashRepository);
  });
  test("Should edit the employee correctly", async () => {
    const employee = Employee.create({
      name: "Nichols Jammerson",
      email: Email.create("nicholsjam@email.com"),
      password: "nn123jam",
    });

    employeeRepository.employees.push(employee);

    await useCase.handle({
      id: employee.id.toString(),
      name: "edited name",
      email: "edited@email.com",
      password: "editedpassword",
    });

    const hashedPassword = await hashRepository.hash("editedpassword");

    expect(employeeRepository.employees[0].name).toEqual("edited name");
    expect(employeeRepository.employees[0].email.value).toEqual(
      "edited@email.com",
    );
    expect(employeeRepository.employees[0].password).toEqual(hashedPassword);
  });
  test("Should edit the employee email with the same email, if he is the email owner", async () => {
    const employee = Employee.create({
      name: "Nichols Jammerson",
      email: Email.create("nicholsjam@email.com"),
      password: "nn123jam",
    });

    employeeRepository.employees.push(employee);

    await useCase.handle({
      id: employee.id.toString(),
      name: "Nichols Jammerson",
      email: "nicholsjam@email.com",
      password: "nn123jam",
    });

    expect(employeeRepository.employees[0].email.value).toEqual(
      "nicholsjam@email.com",
    );
  });
  test("Should NOT edit the employee with invalid email", async () => {
    const employee = Employee.create({
      name: "Nichols Jammerson",
      email: Email.create("nicholsjam@email.com"),
      password: "nn123jam",
    });

    employeeRepository.employees.push(employee);

    const response = await useCase.handle({
      id: employee.id.toString(),
      name: "edited name",
      email: "edited@",
      password: "editedpassword",
    });

    expect(response).toBeNull();
  });

  test("Should NOT edit the employee with email already in use", async () => {
    const employee1 = Employee.create({
      name: "Nichols Jammerson",
      email: Email.create("nicholsjam@email.com"),
      password: "nn123jam",
    });

    const employee2 = Employee.create({
      name: "Billy Terry",
      email: Email.create("billter@email.com"),
      password: "dev123js",
    });

    employeeRepository.employees.push(employee1);
    employeeRepository.employees.push(employee2);

    const response = await useCase.handle({
      id: employee1.id.toString(),
      name: "edited Nichols Jammerson",
      email: "billter@email.com",
      password: "editednn123jam",
    });

    expect(response).toBeNull();
  });
  test("Should not find any employees and return null", async () => {
    const response = await useCase.handle({
      id: "123",
      name: "edited name",
      email: "edited@email.com",
      password: "editedpassword",
    });

    expect(response).toBeNull();
  });
});
