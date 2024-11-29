import Room from "../../employee/entities/room";
import Entity from "../../../core/entities/entity";
import Identity from "../../../core/entities/identity";

type BookingType = {
  room: Room;
  days: number;
  customer: string;
  email: string;
  isActive: boolean;
};

export default class Booking extends Entity<BookingType> {
  static create(data: BookingType, id?: Identity) {
    return new Booking(data, id);
  }
  get room() {
    return this.attributes.room;
  }

  get days() {
    return this.attributes.days;
  }

  get customer() {
    return this.attributes.customer;
  }

  get email() {
    return this.attributes.email;
  }

  get isActive() {
    return this.attributes.isActive;
  }

  set days(days: number) {
    this.attributes.days = days;
  }

  set customer(customer: string) {
    this.attributes.customer = customer;
  }

  set email(email: string) {
    this.attributes.email = email;
  }

  set isActive(isActive: boolean) {
    this.attributes.isActive = isActive;
  }
}
