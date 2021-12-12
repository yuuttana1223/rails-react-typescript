import { RoundButton } from "components/shared_style";
import { VFC } from "react";

type Props = {
  handleCountUp: () => void;
  isDisabled: boolean;
};

export const CountUpButton: VFC<Props> = (props) => (
  <RoundButton onClick={props.handleCountUp} disabled={props.isDisabled}>
    ＋
  </RoundButton>
);
