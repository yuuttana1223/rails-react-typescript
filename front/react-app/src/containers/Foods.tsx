import MainLogo from "assets/images/logo.png";
import FoodImage from "assets/images/food-image.jpg";

import { fetchFoods } from "apis/foods";
import { LocalMallIcon } from "assets/icons";
import { foodsActionTypes } from "constants/foods";
import { HTTP_STATUS_CODE, REQUEST_STATE } from "constants/request";
import { COLORS } from "constants/style";
import { VFC, useEffect, useReducer, useCallback, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { foodsReducer } from "reducers/foods";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { FoodWrapper } from "components/FoodWrapper";
import { Food } from "types/food";
import { FoodOrderDialog } from "components/FoodOrderDialog";
import { postLineFoods } from "apis/line_foods";
import { AxiosError } from "axios";
import { replaceLineFoods } from "../apis/line_foods";
import { NewOrderConfirmDialog } from "../components/NewOrderConfirmDialog";

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
  isOpenNewOrderDialog: boolean;
  existingRestaurantName: string;
  newRestaurantName: string;
};

const initialState: State = {
  isOpenOrderDialog: false,
  selectedFoodCount: 1,
  isOpenNewOrderDialog: false,
  existingRestaurantName: "",
  newRestaurantName: "",
};

export const Foods: VFC = () => {
  const { restaurantId } = useParams();
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const [state, setState] = useState<State>(initialState);
  const navigate = useNavigate();

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

  const handleCountUp = useCallback(() => {
    setState((prevState) => {
      return {
        ...prevState,
        selectedFoodCount: prevState.selectedFoodCount + 1,
      };
    });
  }, []);

  const handleCountDown = useCallback(() => {
    setState((prevState) => {
      return {
        ...prevState,
        selectedFoodCount: prevState.selectedFoodCount - 1,
      };
    });
  }, []);

  const handleOrder = useCallback(() => {
    postLineFoods({
      foodId: state.selectedFood?.id,
      count: state.selectedFoodCount,
    })
      .then(() => navigate("/orders"))
      .catch((e: AxiosError) => {
        if (e.response?.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setState((prevState) => {
            return {
              ...prevState,
              isOpenOrderDialog: false,
              isOpenNewOrderDialog: true,
              existingRestaurantName: e.response?.data.existing_restaurant,
              newRestaurantName: e.response?.data.new_restaurant,
            };
          });
        } else {
          throw e;
        }
      });
  }, [state.selectedFood, state.selectedFoodCount, navigate]);

  const handleConfirmClose = useCallback(() => {
    setState((prevState) => {
      return {
        ...prevState,
        isOpenNewOrderDialog: false,
      };
    });
  }, []);

  const handleReplace = useCallback(() => {
    replaceLineFoods({
      foodId: state.selectedFood?.id,
      count: state.selectedFoodCount,
    }).then(() => navigate("/orders"));
  }, [state.selectedFood, state.selectedFoodCount, navigate]);

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
          countNumber={state.selectedFoodCount}
          handleCountUp={handleCountUp}
          handleCountDown={handleCountDown}
          handleOrder={handleOrder}
        />
      )}
      {state.isOpenNewOrderDialog && (
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          handleClose={handleConfirmClose}
          existingRestaurantName={state.existingRestaurantName}
          newRestaurantName={state.newRestaurantName}
          handleSubmit={handleReplace}
        />
      )}
    </>
  );
};
