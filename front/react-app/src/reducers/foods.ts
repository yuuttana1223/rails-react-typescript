import { foodsActionTypes } from "constants/foods";
import { REQUEST_STATE } from "constants/request";
import { Food } from "types/food";

type State = {
  foods?: Food[];
};

type Action = {
  type: string;
  payload?: State;
};

export const foodsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case foodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case foodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        foods: action.payload?.foods,
      };
    default:
      throw new Error("指定されたタイプが存在しない");
  }
};
