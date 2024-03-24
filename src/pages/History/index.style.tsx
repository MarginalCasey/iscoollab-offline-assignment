import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const Container = styled.div`
  margin: 16px auto;
  max-width: 600px;
`;

export const Section = styled.section`
  position: relative;
  margin: 16px 0;
  padding: 16px 32px;
  background-color: white;
`;

export const Title = styled.div`
  margin-bottom: 16px;
  line-height: 28px;
  font-weight: 700;
  font-size: 18px;
`;

export const OrderedAt = styled.div`
  line-height: 22px;
  font-size: 14px;
  color: #767676;
`;

export const TotalPrice = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  line-height: 28px;
  font-weight: 700;
  font-size: 18px;
`;

export const OrderDetail = styled.div`
  margin-top: 8px;
`;

export const ClearHistoryButton = styled(Button)`
  display: block;
  margin: 32px auto 0;
`;
