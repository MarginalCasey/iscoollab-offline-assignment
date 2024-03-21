import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import MuiDialogActions from "@mui/material/DialogActions";

export const AdjustField = styled.div`
  & + & {
    margin-top: 16px;
  }
`;

export const Label = styled.div`
  line-height: 25px;
  font-weight: 400;
  font-size: 14px;
`;

export const Options = styled.div`
  margin: 0 -4px;
`;

export const OptionButton = styled(Button)`
  margin: 4px;
  display: inline-block;
  line-height: 22px;
`;

export const OptionAmount = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 1;
  padding: 5px;
  border-radius: 4px;
  line-height: 20px;
  color: white;
  background: #f44336;
`;

export const DialogActions = styled(MuiDialogActions)`
  border-top: 1px solid #dfdfdf;
  padding: 16px;
  align-items: stretch;
  justify-content: space-between;
`;
