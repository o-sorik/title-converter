import { expect, test } from "vitest";

import { getCopyFeedbackMessage, nextCopyFeedbackTick } from "./copy-feedback";

test("returns disabled guidance when no output is available", () => {
  expect(getCopyFeedbackMessage("idle", false)).toBe("Convert text to enable copy.");
  expect(getCopyFeedbackMessage("success", false)).toBe("Convert text to enable copy.");
  expect(getCopyFeedbackMessage("error", false)).toBe("Convert text to enable copy.");
});

test("returns explicit success and failure copy feedback when output exists", () => {
  expect(getCopyFeedbackMessage("idle", true)).toBe("Copy result to clipboard.");
  expect(getCopyFeedbackMessage("success", true)).toBe("Copied to clipboard.");
  expect(getCopyFeedbackMessage("error", true)).toBe("Failed to copy. You can manually copy from the output field.");
});

test("increments feedback tick on each copy attempt trigger", () => {
  let tick = 0;
  tick = nextCopyFeedbackTick(tick);
  expect(tick).toBe(1);

  tick = nextCopyFeedbackTick(tick);
  expect(tick).toBe(2);
});
