import { render, screen } from "@testing-library/react";
import Logo from "./index";

describe("Test the Logo component", () => {
  test("Should have a title", async () => {
    render(<Logo />);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Cubic Hotel",
      }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("img", {
        name: "Cubic Hotel image logo",
      }),
    ).toBeInTheDocument();
  });
  test("Logo should have width, height and font with 24px size", async () => {
    render(<Logo />);

    const title = await screen.findByRole("heading", {
      level: 1,
      name: "Cubic Hotel",
    });

    const image = await screen.findByRole("img", {
      name: "Cubic Hotel image logo",
    });

    expect(image.getAttribute("width")).toBe("24");
    expect(image.getAttribute("height")).toBe("24");
    expect(title.style.fontSize).toBe("24px");
  });

  test("Logo should have width, height and font with 32px size", async () => {
    render(<Logo size={32} />);

    const title = await screen.findByRole("heading", {
      level: 1,
      name: "Cubic Hotel",
    });

    const image = await screen.findByRole("img", {
      name: "Cubic Hotel image logo",
    });

    expect(image.getAttribute("width")).toBe("32");
    expect(image.getAttribute("height")).toBe("32");
    expect(title.style.fontSize).toBe("32px");
  });
});
