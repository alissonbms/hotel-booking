import { BaseError } from "../base-error";

export class RoomAlreadyBookedError extends BaseError {
  constructor() {
    super("The room is not available");
  }
}
