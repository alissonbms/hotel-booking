import { Either, left, right } from "./either";

const testValue = (value: string): Either<string, number> => {
  if (value === "correct") {
    return right(123);
  } else {
    return left("Invalid text");
  }
};

describe("Handling erros", () => {
  test("Should test a success use case", () => {
    const result = testValue("correct");

    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(123);
    expect(result.isLeft()).toBe(false);
  });
  test("Should test a failure use case", () => {
    const result = testValue("incorrect");

    expect(result.isRight()).toBe(false);
    expect(result.value).toBe("Invalid text");
    expect(result.isLeft()).toBe(true);
  });
});
