import Booking from "@/entities/Booking";
import BookingDto from "@/infra/dtos/BookingDto";

export type BookingUnion = Booking | BookingDto;
