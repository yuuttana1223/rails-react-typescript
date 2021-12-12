import OrderHeaderImage from "assets/images/order-header.png";

import styled from "styled-components";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { SSubText } from "components/FoodWrapper";
import { VFC } from "react";
import { Food } from "types/food";
import { CountDownButton } from "components/Buttons/CountDownButton";
import { CountUpButton } from "components/Buttons/CountUpButton";
import { OrderButton } from "components/Buttons/OrderButton";

const SOrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const SDescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const SCountersWrapper = styled.div`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
`;

const SCountItem = styled.div`
  margin: 0 8px;
`;

const SCountNum = styled.div`
  padding-top: 10px;
`;

const SOrderTextWrapper = styled.div`
  display: flex;
`;

const SOrderButtonTextWrapper = styled.div`
  width: 300px;
`;

const SPriceWrapper = styled.div`
  padding-top: 4px;
`;

type Props = {
  food?: Food;
  isOpen: boolean;
  handleClose: () => void;
  countNumber: number;
  handleCountUp: () => void;
  handleCountDown: () => void;
  handleOrder: () => void;
};

export const FoodOrderDialog: VFC<Props> = (props) => {
  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <SOrderHeader src={OrderHeaderImage} alt="order header" />
      <DialogTitle>{props.food?.name}</DialogTitle>
      <SDescriptionWrapper>
        <DialogContent>
          <SSubText>{props.food?.description}</SSubText>
        </DialogContent>
      </SDescriptionWrapper>
      <DialogActions>
        <SCountersWrapper>
          <SCountItem>
            <CountDownButton
              handleCountDown={props.handleCountDown}
              isDisabled={props.countNumber <= 1}
            />
          </SCountItem>
          <SCountItem>
            <SCountNum>{props.countNumber}</SCountNum>
          </SCountItem>
          <SCountItem>
            <CountUpButton
              handleCountUp={props.handleCountUp}
              isDisabled={props.countNumber >= 9}
            />
          </SCountItem>
        </SCountersWrapper>
        <OrderButton onClick={props.handleOrder}>
          <SOrderTextWrapper>
            <SOrderButtonTextWrapper>
              {`${props.countNumber}点を注文に追加`}
            </SOrderButtonTextWrapper>
            <SPriceWrapper>{`¥${
              props.food && props.countNumber * props.food?.price
            }`}</SPriceWrapper>
          </SOrderTextWrapper>
        </OrderButton>
      </DialogActions>
    </Dialog>
  );
};
