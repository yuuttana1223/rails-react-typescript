import { LineFoodsSummary } from "types/line_foods";
import { lineFoodsActionTypes } from "../constants/lineFoods";
import { REQUEST_STATE } from "../constants/request";

type State = {
  lineFoodsSummary?: LineFoodsSummary;
};

type Action = {
  type: string;
  payload?: State;
};

export const lineFoodReducer = (state: State, action: Action) => {
  switch (action.type) {
    case lineFoodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case lineFoodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        lineFoodsSummary: action.payload?.lineFoodsSummary,
      };
    case lineFoodsActionTypes.POSTING:
      return {
        ...state,
        postState: lineFoodsActionTypes.POST_SUCCESS,
      };
    case lineFoodsActionTypes.POST_SUCCESS:
      return {
        ...state,
        postState: REQUEST_STATE.OK,
      };
    default:
      throw new Error("指定されたタイプが存在しない");
  }
};
