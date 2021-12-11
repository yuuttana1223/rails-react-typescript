import { REQUEST_STATE } from "constants/request";
import { restaurantsActionTypes } from "constants/restaurants";
import { Restaurant } from "types/restaurant";

type State = {
  restaurants: Restaurant[];
};

type Action = {
  type: string;
  payload?: {
    restaurants: Restaurant[];
  };
};

export const restaurantsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurants: action.payload
          ? action.payload.restaurants
          : state.restaurants,
      };
    default:
      throw new Error("アクションの指定が存在しない");
  }
};
