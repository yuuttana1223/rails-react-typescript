import axios from "axios";
import { Restaurant } from "types/restaurant";
import { RESTAURANTS_URL } from "urls";

export const fetchRestaurants = () => {
  return axios
    .get<Restaurant[]>(RESTAURANTS_URL)
    .then((res) => res.data)
    .catch((e) => e);
};
