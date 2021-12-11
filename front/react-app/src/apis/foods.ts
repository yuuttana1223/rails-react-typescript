import axios from "axios";
import { Food } from "types/food";
import { getFoodsUrl } from "urls";

export const fetchFoods = (restaurantId?: string) => {
  return axios
    .get<Food[]>(getFoodsUrl(restaurantId))
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));
};