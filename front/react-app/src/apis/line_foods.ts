import axios from "axios";
import { LINE_FOODS_REPLACE_URL, LINE_FOODS_URL } from "urls";
import { LineFoodsSummary } from "types/line_foods";
import { AxiosError } from "axios";

type Params = {
  foodId?: number;
  count?: number;
};

export const fetchLineFoods = () => {
  return axios
    .get<LineFoodsSummary>(LINE_FOODS_URL)
    .then((res) => res.data)
    .catch((e: AxiosError) => {
      throw e;
    });
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
