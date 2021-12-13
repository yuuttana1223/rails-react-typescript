import { fetchLineFoods } from "apis/line_foods";
import { VFC, useEffect, useReducer } from "react";
import { AxiosError } from "axios";
import { lineFoodReducer } from "reducers/lineFoods";
import { REQUEST_STATE } from "constants/request";
import { lineFoodsActionTypes } from "../constants/lineFoods";

export const Orders: VFC = () => {
  const [state, dispatch] = useReducer(lineFoodReducer, {
    fetchState: REQUEST_STATE.INITIAL,
    postState: REQUEST_STATE.INITIAL,
  });

  useEffect(() => {
    dispatch({
      type: lineFoodsActionTypes.FETCHING,
    });
    fetchLineFoods()
      .then((data) => {
        dispatch({
          type: lineFoodsActionTypes.FETCH_SUCCESS,
          payload: {
            lineFoodsSummary: data,
          },
        });
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      <div>注文画面</div>
    </>
  );
};
