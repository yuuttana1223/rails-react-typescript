import axios from "axios";
import { Food } from "types/food";
import { getFoodsUrl } from "urls";
import { AxiosError } from "axios";

export const fetchFoods = (restaurantId?: string) => {
  return axios
    .get<Food[]>(getFoodsUrl(restaurantId))
    .then((res) => res.data)
    .catch((e: AxiosError) => {
      throw e;
    });
};
