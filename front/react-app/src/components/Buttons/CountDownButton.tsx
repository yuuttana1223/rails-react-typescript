import { RoundButton } from "components/shared_style";
import { VFC } from "react";

type Props = {
  handleCountDown: () => void;
  isDisabled: boolean;
};

export const CountDownButton: VFC<Props> = (props) => (
  <RoundButton onClick={props.handleCountDown} disabled={props.isDisabled}>
    ー
  </RoundButton>
);
