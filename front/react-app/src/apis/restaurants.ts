import axios from "axios";
import { Restaurant } from "types/restaurant";
import { RESTAURANTS_URL } from "urls";

export const fetchRestaurants = () => {
  return axios
    .get<Restaurant[]>(RESTAURANTS_URL)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));
};
