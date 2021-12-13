import { FONT_SIZE } from "constants/style";
import styled from "styled-components";
import { VFC } from "react";
import { LocalMallIcon, QueryBuilderIcon } from "assets/icons";
import { Link } from "react-router-dom";
const SLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SAmountText = styled.p`
  font-size: ${FONT_SIZE.STAND_BODY};
  font-weight: bold;
`;

type Props = {
  restaurantId: number;
  restaurantName: string;
  restaurantFee: number;
  timeRequired: number;
  foodCount: number;
  price: number;
};

export const OrderDetailItem: VFC<Props> = (props) => {
  return (
    <div>
      <SLineWrapper>
        <LocalMallIcon />
        <Link to={`/restaurants/${props.restaurantId}/foods`}>
          {props.restaurantName}
        </Link>
      </SLineWrapper>
      <SLineWrapper>
        <QueryBuilderIcon />
        {props.timeRequired}分で到着予定
      </SLineWrapper>
      <SLineWrapper>
        <p>商品数</p>
        <p>{props.foodCount}</p>
      </SLineWrapper>
      <SLineWrapper>
        <p>商品数:{props.foodCount}</p>
        <p>¥ {props.price}</p>
      </SLineWrapper>
      <SLineWrapper>
        <p>配送料</p>
        <p>¥ {props.restaurantFee}</p>
      </SLineWrapper>
      <SLineWrapper>
        <SAmountText>合計</SAmountText>
        <SAmountText>¥ {props.price + props.restaurantFee}</SAmountText>
      </SLineWrapper>
    </div>
  );
};
