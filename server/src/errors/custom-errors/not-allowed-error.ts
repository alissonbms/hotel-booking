import { BaseError } from "../base-error";

export class NotAllowedError extends BaseError {
  constructor(value: string) {
    super(`Not allowed because ${value}`);
  }
}
