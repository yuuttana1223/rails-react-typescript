import axios from "axios";
import { ORDERS_URL } from "urls";
import { AxiosError } from "axios";
type Params = {
  lineFoodIds?: number[];
};

export const postOrder = (params: Params) => {
  return axios
    .post(ORDERS_URL, {
      line_food_ids: params.lineFoodIds,
    })
    .then((res) => res.data)
    .catch((e: AxiosError) => {
      throw e;
    });
};
