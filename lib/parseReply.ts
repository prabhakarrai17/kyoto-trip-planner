import type { TripReply } from "@/lib/types";

const CARD_ORDER = ["stay", "experience", "food"] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCard(value: unknown, type: (typeof CARD_ORDER)[number]): boolean {
  if (!isObject(value)) return false;
  const cta = value.cta;
  return (
    value.card_type === type &&
    typeof value.headline === "string" &&
    Array.isArray(value.items) &&
    value.items.length > 0 &&
    isObject(cta) &&
    typeof cta.label === "string"
  );
}

/**
 * Turns a raw reply body into a TripReply, or returns null when it can't be
 * shown as the three cards. The chat shows the error bubble for null.
 */
export function parseTripReply(body: string): TripReply | null {
  let data: unknown;
  try {
    data = JSON.parse(body);
  } catch {
    return null;
  }

  if (!isObject(data) || data.status !== "ok") return null;

  const intent = data.intent;
  if (
    !isObject(intent) ||
    typeof intent.place !== "string" ||
    typeof intent.check_in !== "string" ||
    typeof intent.check_out !== "string"
  ) {
    return null;
  }

  const budget = data.budget;
  if (!isObject(budget) || typeof budget.total_usd !== "number" || typeof budget.reference_usd !== "number") {
    return null;
  }

  const cards = data.cards;
  if (!Array.isArray(cards) || cards.length !== CARD_ORDER.length) return null;
  if (!CARD_ORDER.every((type, i) => isCard(cards[i], type))) return null;

  return data as TripReply;
}
