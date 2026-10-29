import { describe, expect, it } from "vitest";
import { validateMangaInput } from "./manga-input";

describe("validateMangaInput", () => {
  it("normalizes a valid draft manga", () => {
    expect(
      validateMangaInput({
        title: "  Moon Reader  ",
        slug: "Moon-Reader",
        description: "  A story. ",
        authorName: "  Writer  ",
      }),
    ).toEqual({
      title: "Moon Reader",
      slug: "moon-reader",
      description: "A story.",
      authorName: "Writer",
    });
  });

  it("rejects an empty title and an unsafe slug", () => {
    expect(
      validateMangaInput({
        title: " ",
        slug: "moon reader",
        description: "",
        authorName: "",
      }),
    ).toBeUndefined();
  });
});
