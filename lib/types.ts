// Reply shape from the spec sheet ("Mock response shape").
// Every card shares the same top-level field names, and `cards` is always
// ordered stay, experience, food. `filled_fields` lists item fields whose
// value is filler text because the content pack cell was empty.

export type Intent = {
  place: string;
  check_in: string;
  check_out: string;
  guests: number;
};

export type Cta = {
  label: string;
  result_count: number;
};

export type StayItem = {
  option_id: string;
  title: string;
  property_type: string;
  neighbourhood: string;
  nights: number;
  price_usd: number;
  price_unit: "night";
  total_usd: number;
  rating: number;
  review_count: number;
  host: string;
  highlight: string;
  image_url: null;
  filled_fields: string[];
};

export type ExperienceItem = {
  option_id: string;
  title: string;
  category: string;
  date: string;
  start_time: string;
  duration_min: number;
  price_usd: number;
  price_unit: "person";
  total_usd: number;
  rating: number;
  host: string;
  meeting_point: string;
  availability: string;
  filled_fields: string[];
};

export type FoodItem = {
  option_id: string;
  title: string;
  cuisine: string;
  neighbourhood: string;
  meal: string;
  price_level: string;
  total_usd: number;
  walk_min: number;
  booking_note: string;
  image_url: null;
  filled_fields: string[];
};

export type StayCardData = {
  card_type: "stay";
  header_label: "Stay";
  headline: string;
  items: StayItem[];
  tags: string[];
  cta: Cta;
};

export type ExperienceCardData = {
  card_type: "experience";
  header_label: "Experience";
  headline: string;
  items: ExperienceItem[];
  tags: string[];
  cta: Cta;
};

export type FoodCardData = {
  card_type: "food";
  header_label: "Food";
  headline: string;
  items: FoodItem[];
  tags: string[];
  cta: Cta;
};

export type TripReply = {
  query: string;
  status: "ok";
  intent: Intent;
  cards: [StayCardData, ExperienceCardData, FoodCardData];
  budget: { total_usd: number; reference_usd: number };
  error: null;
};
