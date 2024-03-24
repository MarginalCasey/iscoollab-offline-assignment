import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
`;

export const Section = styled.section`
  margin: 16px 0;
  padding: 16px 32px;
  background-color: white;
`;

export const Title = styled.div`
  margin-bottom: 16px;
  line-height: 24px;
  font-weight: 700;
  font-size: 16px;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 16px;
  background-color: #f8f8f8;
`;

export const ItemInfo = styled.div``;

export const ItemName = styled.div`
  padding: 4px 4px 4px 0;
  font-weight: 700;
  font-size: 14px;
`;

export const ItemDetail = styled.div`
  font-size: 12px;
  color: #616161;
`;

export const ItemAction = styled.div``;

export const PurchaseDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  padding: 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 24px;
  font-weight: 700;
  font-size: 16px;
  color: #ff5e7d;
`;

export const PurchaseButton = styled(Button)`
  display: block;
  margin: 32px auto 0;
  ${(props) =>
    props.disabled &&
    css`
      pointer-events: unset !important;
      cursor: progress !important;
    `}
`;
