import { plainToInstance } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  Min,
  validateSync,
} from "class-validator";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsUrl({ protocols: ["postgresql"], require_tld: false })
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  S3_KEY_ID: string;

  @IsString()
  S3_ACCESS_KEY: string;

  @IsString()
  S3_REGION: string;

  @IsString()
  S3_ENDPOINT: string;

  @IsString()
  S3_BUCKET: string;

  @IsUUID()
  @IsString()
  ADMIN_UUID: string;

  @IsString()
  ADMIN_NAME: string;

  @IsEmail()
  @IsString()
  ADMIN_EMAIL: string;

  @IsString()
  ADMIN_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
