import { BaseError } from "../base-error";

export class InvalidFormatError extends BaseError {
  constructor(value: string) {
    super(`Invalid ${value} format`);
  }
}
