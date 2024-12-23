import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from "class-validator";

export class CreateBookingDto {
  @IsNotEmpty({ message: "Room ID should not be empty" })
  @IsUUID("all", { message: "Room ID should be a valid UUID" })
  roomId: string;

  @IsNotEmpty({ message: "Days should not be empty" })
  @IsInt({ message: "Days should be a valid integer" })
  days: number;

  @IsNotEmpty({ message: "Customer should not be empty" })
  customer: string;

  @IsNotEmpty({ message: "Email should not be empty" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsOptional()
  @IsBoolean({ message: "'Is active' field should be true or false" })
  isActive: boolean;
}
