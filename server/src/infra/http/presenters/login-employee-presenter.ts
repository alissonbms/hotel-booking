import Employee from "@/domain/employee/entities/employee";

export class LoginEmployeePresenter {
  static toHTTP(employee: Employee) {
    return {
      id: employee.id.toString(),
      name: employee.name,
      email: employee.email.value,
    };
  }
}
