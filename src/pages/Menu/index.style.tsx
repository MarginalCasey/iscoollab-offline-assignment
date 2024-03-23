import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 0 auto;
  padding: 24px;
  max-width: 1080px;
  columns: 3;
  column-gap: 25px;
  row-gap: 25px;

  > * {
    margin-bottom: 25px;
  }
`;

export const Category = styled.div`
  break-inside: avoid;
  padding: 8px 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 3px -1px hsla(0, 0%, 67.5%, 0.5);
`;

export const Title = styled.div`
  padding: 8px 16px;
  line-height: 32px;
  font-weight: 700;
  font-size: 24px;
  color: #587a30;
`;

export const Product = styled.div`
  padding: 4px 16px;
  cursor: pointer;

  :not(:last-child) {
    border-bottom: 1px solid rgba(68, 68, 68, 0.1);
  }
`;

export const ProductTitle = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  line-height: 24px;
  font-size: 16px;
`;

export const ProductAmount = styled.div`
  margin-left: 8px;
  padding: 0px 5.5px;
  line-height: 18px;
  font-size: 12px;
  color: white;
  background-color: #769902;
  border-radius: 14px;
`;
