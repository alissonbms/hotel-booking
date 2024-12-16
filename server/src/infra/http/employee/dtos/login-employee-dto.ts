import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginEmployeeDto {
  @IsNotEmpty({ message: "Email should not be empty" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsNotEmpty({ message: "Password should not be empty" })
  password: string;
}
