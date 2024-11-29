import Entity from "../../../core/entities/entity";
import Identity from "../../../core/entities/identity";

type EmployeeType = {
  name: string;
  email: string;
  password: string;
};

export default class Employee extends Entity<EmployeeType> {
  constructor(data: EmployeeType, id?: Identity) {
    super(data, id);
  }

  get name() {
    return this.attributes.name;
  }

  get email() {
    return this.attributes.email;
  }

  get password() {
    return this.attributes.password;
  }

  set name(name: string) {
    this.attributes.name = name;
  }

  set email(email: string) {
    this.attributes.email = email;
  }

  set password(password: string) {
    this.attributes.password = password;
  }
}
