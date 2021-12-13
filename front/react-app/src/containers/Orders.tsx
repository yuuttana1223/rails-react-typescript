import { fetchLineFoods } from "apis/line_foods";
import { VFC, useEffect, useReducer, useCallback } from "react";
import { AxiosError } from "axios";
import { lineFoodsReducer } from "reducers/lineFoods";
import { REQUEST_STATE } from "constants/request";
import { postOrder } from "apis/order";
import { lineFoodsActionTypes } from "constants/lineFoods";

import MainLogo from "assets/images/logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { OrderDetailItem } from "components/OrderDetailItem";
import { OrderButton } from "components/Buttons/OrderButton";

const SHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const SMainLogoImage = styled.img`
  height: 90px;
`;

const SOrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SOrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;

export const Orders: VFC = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, {
    fetchState: REQUEST_STATE.INITIAL,
    postState: REQUEST_STATE.INITIAL,
  });

  const handleSubmit = useCallback(() => {
    dispatch({
      type: lineFoodsActionTypes.POSTING,
    });
    postOrder({
      lineFoodIds: state.lineFoodsSummary?.line_food_ids,
    }).then(() => {
      dispatch({
        type: lineFoodsActionTypes.POST_SUCCESS,
      });
      window.location.reload();
    });
  }, [state.lineFoodsSummary]);

  const orderButtonLabel = useCallback(() => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return "注文中...";
      case REQUEST_STATE.OK:
        return "注文が完了しました!";
      default:
        return "注文を確定する";
    }
  }, [state.postState]);

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
    <div>
      <SHeaderWrapper>
        <Link to="/restaurants">
          <SMainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </SHeaderWrapper>
      <SOrderListWrapper>
        <div>
          <SOrderItemWrapper>
            {state.fetchState === REQUEST_STATE.LOADING ? (
              <CircularProgress />
            ) : (
              state.lineFoodsSummary && (
                <OrderDetailItem
                  restaurantFee={state.lineFoodsSummary.restaurant.fee}
                  restaurantName={state.lineFoodsSummary.restaurant.name}
                  restaurantId={state.lineFoodsSummary.restaurant.id}
                  timeRequired={state.lineFoodsSummary.restaurant.time_required}
                  foodCount={state.lineFoodsSummary.count}
                  price={state.lineFoodsSummary.amount}
                />
              )
            )}
          </SOrderItemWrapper>
          <div>
            {state.fetchState === REQUEST_STATE.OK && state.lineFoodsSummary && (
              <OrderButton
                onClick={handleSubmit}
                disabled={
                  state.postState === REQUEST_STATE.LOADING ||
                  state.postState === REQUEST_STATE.OK
                }
              >
                {orderButtonLabel()}
              </OrderButton>
            )}
            {state.fetchState === REQUEST_STATE.OK &&
              !state.lineFoodsSummary && <p>注文予定の商品はありません。</p>}
          </div>
        </div>
      </SOrderListWrapper>
    </div>
  );
};
