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
  padding: 8px 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 3px -1px hsla(0, 0%, 67.5%, 0.5);
`;

export const Title = styled.div`
  padding: 8px 0;
  line-height: 32px;
  font-weight: 700;
  font-size: 24px;
  color: #587a30;
`;
