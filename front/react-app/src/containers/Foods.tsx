import MainLogo from "assets/images/logo.png";
import FoodImage from "assets/images/food-image.jpg";

import { fetchFoods } from "apis/foods";
import { LocalMallIcon } from "assets/icons";
import { foodsActionTypes } from "constants/foods";
import { REQUEST_STATE } from "constants/request";
import { COLORS } from "constants/style";
import { VFC, useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { foodsReducer } from "reducers/foods";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { FoodWrapper } from "components/FoodWrapper";

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

const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foods: [],
};

export const Foods: VFC = () => {
  const { restaurantId } = useParams();
  const [state, dispatch] = useReducer(foodsReducer, initialState);

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
  console.log(state.fetchState);

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
        {state.fetchState === REQUEST_STATE.LOADING
          ? [...Array(12)].map((_, index) => (
              <SItemWrapper key={index}>
                <Skeleton variant="rectangular" width={450} height={180} />
              </SItemWrapper>
            ))
          : state.foods?.map((food) => (
              <SItemWrapper key={food.id}>
                <FoodWrapper
                  food={food}
                  handleClick={(food) => console.log(food)}
                  imageUrl={FoodImage}
                />
              </SItemWrapper>
            ))}
      </SFoodsList>
    </>
  );
};
