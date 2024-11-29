import Entity from "../../../core/entities/entity";
import Identity from "../../../core/entities/identity";

type RoomType = {
  name: string;
  price: number;
  image: string;
  hasWifi: boolean;
  hasAir: boolean;
  hasKitchen: boolean;
  isPetFriendly: boolean;
  isAvailable: boolean;
};

export default class Room extends Entity<RoomType> {
  constructor(data: RoomType, id?: Identity) {
    super(data, id);
  }

  get name() {
    return this.attributes.name;
  }

  get price() {
    return this.attributes.price;
  }

  get image() {
    return this.attributes.image;
  }

  get hasWifi() {
    return this.attributes.hasWifi;
  }

  get hasAir() {
    return this.attributes.hasAir;
  }

  get hasKitchen() {
    return this.attributes.hasKitchen;
  }

  get isPetFriendly() {
    return this.attributes.isPetFriendly;
  }

  get isAvailable() {
    return this.attributes.isAvailable;
  }

  set name(name: string) {
    this.attributes.name = name;
  }

  set price(price: number) {
    this.attributes.price = price;
  }

  set image(image: string) {
    this.attributes.image = image;
  }

  set hasWifi(hasWifi: boolean) {
    this.attributes.hasWifi = hasWifi;
  }

  set hasAir(hasAir: boolean) {
    this.attributes.hasAir = hasAir;
  }

  set hasKitchen(hasKitchen: boolean) {
    this.attributes.hasKitchen = hasKitchen;
  }

  set isPetFriendly(isPetFriendly: boolean) {
    this.attributes.isPetFriendly = isPetFriendly;
  }

  set isAvailable(isAvailable: boolean) {
    this.attributes.isAvailable = isAvailable;
  }
}
