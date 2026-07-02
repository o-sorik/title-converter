export type CopyFeedbackState = "idle" | "success" | "error";

export function getCopyFeedbackMessage(state: CopyFeedbackState, hasOutput: boolean): string {
  if (!hasOutput) return "Type or paste text to enable copy.";

  if (state === "success") return "Copied to clipboard.";
  if (state === "error") return "Failed to copy. You can manually copy from the output field.";
  return "Copy result to clipboard.";
}

export function nextCopyFeedbackTick(currentTick: number): number {
  return currentTick + 1;
}
