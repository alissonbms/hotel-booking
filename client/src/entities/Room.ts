export default class Room {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly image: string,
    readonly hasWifi: boolean,
    readonly hasAir: boolean,
    readonly hasKitchen: boolean,
    readonly isPetFriendly: boolean,
    readonly isAvailable: boolean,
  ) {}
}
