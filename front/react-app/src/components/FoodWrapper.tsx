import { COLORS, FONT_SIZE } from "constants/style";
import { VFC } from "react";
import styled from "styled-components";
import { Food } from "types/food";

export const SSubText = styled.p`
  color: ${COLORS.SUB_TEXT};
  font-size: ${FONT_SIZE.BODY2};
`;

const SWrapper = styled.div`
  display: flex;
  width: 450px;
  height: 180px;
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.BORDER};
  border-image: initial;
  cursor: pointer;
`;

const SFoodDetail = styled.div`
  padding: 24px 16px;
  width: 250px;
`;

const SDescriptionWrapper = styled.div`
  height: 75px;
`;

const SPriceWrapper = styled.div`
  margin-top: 16px;
`;

const SFoodImageNode = styled.img`
  width: 250px;
`;

type Props = {
  food: Food;
  handleClick: (food: Food) => void;
  imageUrl: string;
};

export const FoodWrapper: VFC<Props> = (props) => (
  <SWrapper onClick={() => props.handleClick(props.food)}>
    <SFoodDetail>
      {props.food.name}
      <SDescriptionWrapper>
        <SSubText>{props.food.description}</SSubText>
      </SDescriptionWrapper>
      <SPriceWrapper>¥{props.food.price}</SPriceWrapper>
    </SFoodDetail>
    <SFoodImageNode src={props.imageUrl} />
  </SWrapper>
);
