import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty({ message: "Name should not be empty" })
  name: string;

  @IsNotEmpty({ message: "Price should not be empty" })
  @IsInt({ message: "Price should be a valid integer" })
  price: number;

  @IsNotEmpty({ message: "Image should not be empty" })
  image: string;

  @IsOptional()
  @IsBoolean({ message: "'Has wifi' field should be true or false" })
  hasWifi: boolean;

  @IsOptional()
  @IsBoolean({ message: "'Has air' field should be true or false" })
  hasAir: boolean;

  @IsOptional()
  @IsBoolean({ message: "'Has kitchen' field should be true or false" })
  hasKitchen: boolean;

  @IsOptional()
  @IsBoolean({ message: "'Is pet friendly' field should be true or false" })
  isPetFriendly: boolean;

  @IsOptional()
  @IsBoolean({ message: "'Is available' field should be true or false" })
  isAvailable: boolean;
}
