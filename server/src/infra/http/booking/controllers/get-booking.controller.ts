import GetBookingUseCase from "@/domain/booking/use-cases/get-booking";
import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { BookingPresenter } from "../../presenters/booking-presenter";
import { Public } from "@/infra/auth/public";

@Controller("/bookings/:id")
@Public()
export class GetBookingController {
  constructor(private readonly getBooking: GetBookingUseCase) {}

  @Get()
  async handle(@Param("id") id: string) {
    const response = await this.getBooking.handle({ id });

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message);
    }

    return BookingPresenter.toHTTP(response.value);
  }
}
