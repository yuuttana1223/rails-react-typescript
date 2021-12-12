import axios from "axios";
import { LINE_FOODS_REPLACE_URL, LINE_FOODS_URL } from "urls";
type Params = {
  foodId?: number;
  count?: number;
};

export const postLineFoods = (params: Params) => {
  return axios
    .post(LINE_FOODS_URL, {
      food_id: params.foodId,
      count: params.count,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e: Error) => {
      throw e;
    });
};

export const replaceLineFoods = (params: Params) => {
  return axios
    .put(LINE_FOODS_REPLACE_URL, {
      food_id: params.foodId,
      count: params.count,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e: Error) => {
      throw e;
    });
};
