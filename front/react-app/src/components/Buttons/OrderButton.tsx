import { BaseButton } from "components/shared_style";
import { FONT_SIZE } from "constants/style";
import styled from "styled-components";

export const OrderButton = styled(BaseButton)`
  width: 390px;
  background-color: black;
  color: white;
  border-style: none;
  padding: 8px 16px;
  font-size: ${FONT_SIZE.BODY1};
`;
