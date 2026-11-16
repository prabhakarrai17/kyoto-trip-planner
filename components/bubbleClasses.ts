// Shape and position shared by every assistant reply bubble (the thinking
// bubble and the error bubble), so an error keeps the same corners, left
// alignment and width as a normal reply. Only the colours inside change.
export const ASSISTANT_BUBBLE =
  "self-start justify-self-start max-w-[80%] rounded-2xl rounded-bl-md border px-4 py-3";

// Neutral colours for a normal reply bubble, from the app's tokens.
export const ASSISTANT_BUBBLE_COLORS = "bg-surface border-line text-ink";
