import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import MysteryCase from "../MysteryCase";

test("alt test renders on Mystery Case image", async () => {
  const name = "The Case of the Fried Chicken Wing";
  const src = "https://picsum.photos/200";

  const screen = render(
    <MysteryCase
      name={name}
      description="fried-chicken-wing-case"
      image={src}
    />,
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});
