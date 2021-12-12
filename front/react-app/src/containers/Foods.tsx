import MainLogo from "assets/images/logo.png";
import FoodImage from "assets/images/food-image.jpg";

import { fetchFoods } from "apis/foods";
import { LocalMallIcon } from "assets/icons";
import { foodsActionTypes } from "constants/foods";
import { REQUEST_STATE } from "constants/request";
import { COLORS } from "constants/style";
import { VFC, useEffect, useReducer, useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { foodsReducer } from "reducers/foods";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { FoodWrapper } from "components/FoodWrapper";
import { Food } from "types/food";
import { FoodOrderDialog } from "components/FoodOrderDialog";

const SHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 32px;
`;

const SBagIconWrapper = styled.div`
  padding-top: 24px;
`;

const SColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const SMainLogoImage = styled.img`
  height: 90px;
`;

const SFoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const SItemWrapper = styled.div`
  margin: 16px;
`;

const foodsInitialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foods: [],
};

type State = {
  isOpenOrderDialog: boolean;
  selectedFood?: Food;
  selectedFoodCount: number;
};

const initialState: State = {
  isOpenOrderDialog: false,
  selectedFoodCount: 1,
};

export const Foods: VFC = () => {
  const { restaurantId } = useParams();
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const [state, setState] = useState<State>(initialState);

  const handleOpen = useCallback((food: Food) => {
    setState((prevState) => {
      return {
        ...prevState,
        isOpenOrderDialog: true,
        selectedFood: food,
      };
    });
  }, []);

  const handleClose = useCallback(() => {
    setState((prevState) => {
      return {
        ...prevState,
        isOpenOrderDialog: false,
      };
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: foodsActionTypes.FETCHING,
    });
    fetchFoods(restaurantId).then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data,
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SHeaderWrapper>
        <Link to="/restaurants">
          <SMainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <SBagIconWrapper>
          <Link to="/orders">
            <SColoredBagIcon fontSize="large" />
          </Link>
        </SBagIconWrapper>
      </SHeaderWrapper>
      <SFoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING
          ? [...Array(12)].map((_, index) => (
              <SItemWrapper key={index}>
                <Skeleton variant="rectangular" width={450} height={180} />
              </SItemWrapper>
            ))
          : foodsState.foods?.map((food) => (
              <SItemWrapper key={food.id}>
                <FoodWrapper
                  food={food}
                  handleOpen={handleOpen}
                  imageUrl={FoodImage}
                />
              </SItemWrapper>
            ))}
      </SFoodsList>
      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          food={state.selectedFood}
          isOpen={state.isOpenOrderDialog}
          handleClose={handleClose}
        />
      )}
    </>
  );
};
