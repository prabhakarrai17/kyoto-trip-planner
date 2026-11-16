import { buildMockReply } from "@/lib/mockReply";

// Forced-failure trigger from the spec: end any message with "/fail" and the
// mock server answers with broken data the app can't turn into cards.
// Example: "Kyoto weekend plan /fail"
export const FAULT_TRIGGER = "/fail";

const triggerPattern = /\s*\/fail\s*$/i;

/** Splits the trigger off the end of what the guest typed. */
export function readTrigger(text: string): { query: string; forceFailure: boolean } {
  const forceFailure = triggerPattern.test(text);
  return { query: text.replace(triggerPattern, "").trim(), forceFailure };
}

// Fake sample data that looks like a reply but can't become cards: the stay
// card has no headline and its items aren't a list, the experience card's
// type is misspelled, and the food card is missing.
function brokenReply(query: string) {
  return {
    query,
    status: "ok",
    intent: { place: "Kyoto" },
    cards: [
      { card_type: "stay", header_label: "Stay", headline: null, items: "S1" },
      { card_type: "experiance", header_label: "Experience", items: [] },
    ],
    error: null,
  };
}

/**
 * Stands in for the search API. Returns the raw JSON body, like a network
 * response would, so the app has to parse and check it before showing cards.
 */
export function fetchReplyBody(query: string, options: { forceFailure: boolean }): string {
  if (options.forceFailure) return JSON.stringify(brokenReply(query));
  return JSON.stringify(buildMockReply(query));
}
