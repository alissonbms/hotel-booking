import { AuthEmployeeUseCase } from "@/domain/employee/use-cases/auth-employee";
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginEmployeeDto } from "../dtos/login-employee-dto";
import { LoginEmployeePresenter } from "../../presenters/login-employee-presenter";
import { Public } from "@/infra/auth/public";

@Controller("/login")
@Public()
export class LoginEmployeeController {
  constructor(private readonly authEmployee: AuthEmployeeUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() body: LoginEmployeeDto) {
    const { email, password } = body;

    const response = await this.authEmployee.handle({
      email,
      password,
    });

    if (response.isLeft()) {
      throw new UnauthorizedException(response.value.message);
    }

    const { employee, token } = response.value;

    return {
      token,
      employee: LoginEmployeePresenter.toHTTP(employee),
    };
  }
}
