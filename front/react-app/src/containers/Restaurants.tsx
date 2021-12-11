import { useEffect, useReducer, VFC } from "react";
import styled from "styled-components";
import { restaurantsReducer } from "reducers/restaurants";
import { REQUEST_STATE } from "constants/request";
import { restaurantsActionTypes } from "constants/restaurants";
import { fetchRestaurants } from "apis/restaurants";

import MainLogo from "assets/images/logo.png";
import MainCoverImage from "assets/images/main-cover-image.png";
import RestaurantImage from "assets/images/restaurant-image.jpg";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const SHederWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const SMainLogoImage = styled.img`
  height: 90px;
`;

const SMainCoverImageWrapper = styled.div`
  text-align: center;
`;

const SMainCover = styled.img`
  height: 600px;
`;

const SRestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const SRestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const SRestaurantsImageNode = styled.img`
  width: 100%;
`;

const SMainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SSubText = styled.p`
  color: black;
  font-size: 12px;
`;

const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  restaurants: [],
};

export const Restaurants: VFC = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);
  useEffect(() => {
    dispatch({
      type: restaurantsActionTypes.FETCHING,
    });
    fetchRestaurants().then((data) => {
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        payload: {
          restaurants: data,
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SHederWrapper>
        <SMainLogoImage src={MainLogo} alt="main logo" />
      </SHederWrapper>
      <SMainCoverImageWrapper>
        <SMainCover src={MainCoverImage} alt="main logo" />
      </SMainCoverImageWrapper>

      <SRestaurantsContentsList>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <>
            <Skeleton variant="rectangular" width={450} height={300} />
            <Skeleton variant="rectangular" width={450} height={300} />
            <Skeleton variant="rectangular" width={450} height={300} />
          </>
        ) : (
          state.restaurants?.map((restaurant) => (
            <Link
              to={`/restaurants/${restaurant.id}/foods`}
              key={restaurant.id}
            >
              <SRestaurantsContentWrapper>
                <SRestaurantsImageNode src={RestaurantImage} />
                <SMainText>{restaurant.name}</SMainText>
                <SSubText>
                  配送料: {restaurant.fee}円 {restaurant.time_required}分
                </SSubText>
              </SRestaurantsContentWrapper>
            </Link>
          ))
        )}
      </SRestaurantsContentsList>
    </>
  );
};
