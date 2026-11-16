import {
  experiences,
  food,
  GUESTS,
  REFERENCE_BUDGET_USD,
  stays,
} from "@/data/contentPack";
import type { TripReply } from "@/lib/types";

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

function pick<T extends { optionId: string }>(rows: T[], id: string): T {
  const row = rows.find((r) => r.optionId === id);
  if (!row) throw new Error(`Row ${id} is missing from the content pack`);
  return row;
}

export function buildMockReply(query: string): TripReply {
  const stay = pick(stays, PICKED_ROWS.stay);
  const exp = pick(experiences, PICKED_ROWS.experience);
  const meal = pick(food, PICKED_ROWS.food);

  const stayFilled: string[] = [];
  const expFilled: string[] = [];
  const foodFilled: string[] = [];

  const openExperiences = experiences.filter((e) => e.availability === "Spots open").length;

  return {
    query,
    status: "ok",
    intent: {
      place: "Kyoto",
      check_in: stay.checkIn,
      check_out: stay.checkOut,
      guests: GUESTS,
    },
    cards: [
      {
        card_type: "stay",
        header_label: "Stay",
        headline: fill(stay.listingTitle, "title", stayFilled),
        items: [
          {
            option_id: stay.optionId,
            title: fill(stay.listingTitle, "title", []),
            property_type: fill(stay.propertyType, "property_type", stayFilled),
            neighbourhood: fill(stay.neighbourhood, "neighbourhood", stayFilled),
            nights: stay.nights,
            price_usd: stay.pricePerNightUsd,
            price_unit: "night",
            total_usd: stay.totalUsd,
            rating: stay.guestRating,
            review_count: stay.reviewCount,
            host: fill(stay.hostFirstName, "host", stayFilled, FILLER.host),
            highlight: fill(stay.highlight, "highlight", stayFilled),
            image_url: null,
            filled_fields: stayFilled,
          },
        ],
        tags: [stay.propertyType, stay.neighbourhood].filter(Boolean),
        cta: { label: `See all ${stays.length} stays`, result_count: stays.length },
      },
      {
        card_type: "experience",
        header_label: "Experience",
        headline: fill(exp.title, "title", expFilled),
        items: [
          {
            option_id: exp.optionId,
            title: fill(exp.title, "title", []),
            category: fill(exp.category, "category", expFilled),
            date: exp.date,
            start_time: exp.startTime,
            duration_min: Math.round(exp.durationHours * 60),
            price_usd: exp.pricePerGuestUsd,
            price_unit: "person",
            total_usd: exp.totalUsd,
            rating: exp.rating,
            host: fill(exp.hostFirstName, "host", expFilled, FILLER.host),
            meeting_point: fill(exp.meetingPoint, "meeting_point", expFilled),
            availability: exp.availability,
            filled_fields: expFilled,
          },
        ],
        tags: [],
        cta: {
          label: `See ${openExperiences} open experiences`,
          result_count: openExperiences,
        },
      },
      {
        card_type: "food",
        header_label: "Food",
        headline: fill(meal.placeName, "title", foodFilled),
        items: [
          {
            option_id: meal.optionId,
            title: fill(meal.placeName, "title", []),
            cuisine: fill(meal.cuisine, "cuisine", foodFilled),
            neighbourhood: fill(meal.neighbourhood, "neighbourhood", foodFilled),
            meal: fill(meal.meal, "meal", foodFilled),
            price_level: meal.priceLevel,
            total_usd: meal.estCostUsd,
            walk_min: meal.walkFromStayMin,
            booking_note: fill(meal.bookingNote, "booking_note", foodFilled, FILLER.booking_note),
            image_url: null,
            filled_fields: foodFilled,
          },
        ],
        tags: [meal.meal, meal.cuisine].filter(Boolean),
        cta: { label: `See all ${food.length} food picks`, result_count: food.length },
      },
    ],
    budget: {
      total_usd: stay.totalUsd + exp.totalUsd + meal.estCostUsd,
      reference_usd: REFERENCE_BUDGET_USD,
    },
    error: null,
  };
}
