import { Restaurant } from "types/restaurant";

export type LineFoodsSummary = {
  line_food_ids: number[];
  restaurant: Restaurant;
  count: number;
  amount: number;
};
