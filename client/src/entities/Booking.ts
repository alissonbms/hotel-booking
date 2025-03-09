import Room from "./Room";

export default class Booking {
  constructor(
    readonly id: string,
    readonly room: Room,
    readonly days: number,
    readonly customer: string,
    readonly email: string,
    readonly isActive: boolean,
  ) {}
}
