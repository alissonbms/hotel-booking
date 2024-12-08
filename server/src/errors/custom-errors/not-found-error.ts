import { BaseError } from "../base-error";

export class NotFoundError extends BaseError {
  constructor(value: string) {
    super(`${value} not found`);
  }
}
