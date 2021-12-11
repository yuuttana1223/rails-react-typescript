const API_URL = "http://localhost:3000/api/v1";

export const RESTAURANTS_URL = `${API_URL}/restaurants`;
export const getFoodsUrl = (restaurantId?: string) =>
  `${API_URL}/restaurants/${restaurantId}/foods`;

export const LINE_FOODS_URL = `${API_URL}/line_foods`;
export const LINE_FOODS_REPLACE_URL = `${API_URL}/line_foods/replace`;
export const ORDERS_URL = `${API_URL}/orders`;
