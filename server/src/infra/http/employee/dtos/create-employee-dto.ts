import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {
  @IsNotEmpty({ message: "Name should not be empty" })
  name: string;

  @IsNotEmpty({ message: "Email should not be empty" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsNotEmpty({ message: "Password should not be empty" })
  password: string;
}
