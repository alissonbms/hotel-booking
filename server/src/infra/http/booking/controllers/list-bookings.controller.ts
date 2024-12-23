import { ListBookingsUseCase } from "@/domain/booking/use-cases/list-bookings";
import { Controller, Get } from "@nestjs/common";
import { BookingPresenter } from "../../presenters/booking-presenter";

@Controller("/bookings")
export class ListBookingsController {
  constructor(private readonly listBookings: ListBookingsUseCase) {}

  @Get()
  async handle() {
    const response = await this.listBookings.handle();

    return response.value.map(BookingPresenter.toHTTP);
  }
}
