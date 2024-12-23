import { CreateBookingUseCase } from "@/domain/booking/use-cases/create-booking";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from "@nestjs/common";
import { CreateBookingDto } from "../dtos/create-booking.dto";
import { NotFoundError } from "@/core/errors/custom-errors/not-found-error";
import { Public } from "@/infra/auth/public";
import { BookingPresenter } from "../../presenters/booking-presenter";

@Controller("/bookings")
@Public()
export class CreateBookingController {
  constructor(private readonly createBooking: CreateBookingUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateBookingDto) {
    const { roomId, days, customer, email, isActive } = body;

    const response = await this.createBooking.handle({
      roomId,
      days,
      customer,
      email,
      isActive,
    });

    if (response.isLeft()) {
      if (response.value.constructor === NotFoundError) {
        throw new NotFoundException(response.value.message);
      }

      throw new BadRequestException(response.value.message);
    }

    return BookingPresenter.toHTTP(response.value);
  }
}
