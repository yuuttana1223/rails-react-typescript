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

const SOrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const SDescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

type Props = {
  food?: Food;
  isOpen: boolean;
  handleClose: () => void;
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
      <DialogActions>数量を操作するアクションを入れる予定</DialogActions>
    </Dialog>
  );
};
