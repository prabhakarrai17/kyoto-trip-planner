import {
  experiences,
  food,
  GUESTS,
  REFERENCE_BUDGET_USD,
  stays,
  type ExperienceRow,
  type FoodRow,
  type StayRow,
} from "@/data/contentPack";
import { photos } from "@/data/photos";
import type { ExperienceItem, FoodItem, StayItem, TripReply } from "@/lib/types";

// One row per sheet of the content pack. E4 has no host and F2 has no
// booking note, so this pick shows the filler text on screen.
export const PICKED_ROWS = { stay: "S1", experience: "E4", food: "F2" } as const;

export const FILLER = {
  host: "Host to be confirmed",
  booking_note: "Booking details to be confirmed",
  text: "Details to be confirmed",
} as const;

// Returns the cell value, or filler text when the cell is empty.
// Records the field name so the card can style filler differently.
function fill(value: string, field: string, filled: string[], filler: string = FILLER.text) {
  if (value.trim()) return value;
  filled.push(field);
  return filler;
}

function photoFor(optionId: string) {
  const photo = photos[optionId];
  return { image_url: photo?.src ?? null, image_alt: photo?.alt ?? null };
}

function pick<T extends { optionId: string }>(rows: T[], id: string): T {
  const row = rows.find((r) => r.optionId === id);
  if (!row) throw new Error(`Row ${id} is missing from the content pack`);
  return row;
}

export function toStayItem(row: StayRow): StayItem {
  const filled: string[] = [];
  return {
    option_id: row.optionId,
    title: fill(row.listingTitle, "title", filled),
    property_type: fill(row.propertyType, "property_type", filled),
    neighbourhood: fill(row.neighbourhood, "neighbourhood", filled),
    nights: row.nights,
    price_usd: row.pricePerNightUsd,
    price_unit: "night",
    total_usd: row.totalUsd,
    rating: row.guestRating,
    review_count: row.reviewCount,
    host: fill(row.hostFirstName, "host", filled, FILLER.host),
    highlight: fill(row.highlight, "highlight", filled),
    ...photoFor(row.optionId),
    filled_fields: filled,
  };
}

export function toExperienceItem(row: ExperienceRow): ExperienceItem {
  const filled: string[] = [];
  return {
    option_id: row.optionId,
    title: fill(row.title, "title", filled),
    category: fill(row.category, "category", filled),
    date: row.date,
    start_time: row.startTime,
    duration_min: Math.round(row.durationHours * 60),
    price_usd: row.pricePerGuestUsd,
    price_unit: "person",
    total_usd: row.totalUsd,
    rating: row.rating,
    host: fill(row.hostFirstName, "host", filled, FILLER.host),
    meeting_point: fill(row.meetingPoint, "meeting_point", filled),
    availability: row.availability,
    ...photoFor(row.optionId),
    filled_fields: filled,
  };
}

export function toFoodItem(row: FoodRow): FoodItem {
  const filled: string[] = [];
  return {
    option_id: row.optionId,
    title: fill(row.placeName, "title", filled),
    cuisine: fill(row.cuisine, "cuisine", filled),
    neighbourhood: fill(row.neighbourhood, "neighbourhood", filled),
    meal: fill(row.meal, "meal", filled),
    price_level: row.priceLevel,
    total_usd: row.estCostUsd,
    walk_min: row.walkFromStayMin,
    booking_note: fill(row.bookingNote, "booking_note", filled, FILLER.booking_note),
    ...photoFor(row.optionId),
    filled_fields: filled,
  };
}

// Everything behind each card's "See all" button, in content pack order.
export type ResultsKind = "stay" | "experience" | "food";

export function allStays(): StayItem[] {
  return stays.map(toStayItem);
}

export function allExperiences(): ExperienceItem[] {
  return experiences.map(toExperienceItem);
}

export function allFood(): FoodItem[] {
  return food.map(toFoodItem);
}

export function buildMockReply(query: string): TripReply {
  const stay = toStayItem(pick(stays, PICKED_ROWS.stay));
  const exp = toExperienceItem(pick(experiences, PICKED_ROWS.experience));
  const meal = toFoodItem(pick(food, PICKED_ROWS.food));
  const stayRow = pick(stays, PICKED_ROWS.stay);

  const openExperiences = experiences.filter((e) => e.availability === "Spots open").length;

  return {
    query,
    status: "ok",
    intent: {
      place: "Kyoto",
      check_in: stayRow.checkIn,
      check_out: stayRow.checkOut,
      guests: GUESTS,
    },
    cards: [
      {
        card_type: "stay",
        header_label: "Stay",
        headline: stay.title,
        items: [stay],
        tags: [stay.property_type, stay.neighbourhood],
        cta: { label: `See all ${stays.length} stays`, result_count: stays.length },
      },
      {
        card_type: "experience",
        header_label: "Experience",
        headline: exp.title,
        items: [exp],
        tags: [],
        cta: {
          label: `See ${openExperiences} open experiences`,
          result_count: openExperiences,
        },
      },
      {
        card_type: "food",
        header_label: "Food",
        headline: meal.title,
        items: [meal],
        tags: [meal.meal, meal.cuisine],
        cta: { label: `See all ${food.length} food picks`, result_count: food.length },
      },
    ],
    budget: {
      total_usd: stay.total_usd + exp.total_usd + meal.total_usd,
      reference_usd: REFERENCE_BUDGET_USD,
    },
    error: null,
  };
}
