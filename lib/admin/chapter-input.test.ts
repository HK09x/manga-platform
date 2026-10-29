import { describe, expect, it } from "vitest";
import { validateChapterInput } from "./chapter-input";

describe("validateChapterInput", () => {
  it("normalizes a draft chapter with an admin-selected order", () => {
    expect(validateChapterInput({ slug: " Chapter-1 ", chapterNumber: " 1 ", title: " Start ", sortOrder: "10" })).toEqual({ slug: "chapter-1", chapterNumber: "1", title: "Start", sortOrder: 10 });
  });
  it("rejects invalid order values", () => {
    expect(validateChapterInput({ slug: "chapter-1", chapterNumber: "1", title: "Start", sortOrder: "1.5" })).toBeUndefined();
  });
});
