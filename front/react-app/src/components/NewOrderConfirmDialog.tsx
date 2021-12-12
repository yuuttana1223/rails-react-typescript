import { VFC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { OrderButton } from "components/Buttons/OrderButton";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  existingRestaurantName: string;
  newRestaurantName: string;
  handleSubmit: () => void;
};

export const NewOrderConfirmDialog: VFC<Props> = (props) => (
  <Dialog open={props.isOpen} onClose={props.handleClose} maxWidth="xs">
    <DialogTitle>新規注文を開始しますか？</DialogTitle>
    <DialogContent>
      <p>
        {`ご注文に ${props.existingRestaurantName} の商品が含まれています。
          新規の注文を開始して ${props.newRestaurantName} の商品を追加してください。`}
      </p>
      <OrderButton onClick={props.handleSubmit}>新規注文</OrderButton>
    </DialogContent>
  </Dialog>
);
