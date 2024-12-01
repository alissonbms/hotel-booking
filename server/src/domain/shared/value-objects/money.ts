export default class Money {
  private constructor(readonly value: number) {
    this.value = value;
  }

  static create(value: number) {
    return new Money(value);
  }

  formattedPriceUSD() {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(this.value);
  }
}
