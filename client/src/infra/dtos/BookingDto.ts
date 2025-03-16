export default class BookingDto {
  constructor(
    readonly roomId: string,
    readonly days: number,
    readonly customer: string,
    readonly email: string,
  ) {}
}
