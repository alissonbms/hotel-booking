import Employee from "@/domain/employee/entities/employee";

export class EmployeePresenter {
  static toHTTP(employee: Employee) {
    return {
      id: employee.id.toString(),
      name: employee.name,
      email: employee.email.value,
    };
  }
}
