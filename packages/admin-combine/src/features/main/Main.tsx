import styled from '@emotion/styled';
import { DiseasePage } from '@src/pages/disease/DiseasePage';

export function Main() {
  return (
    <MainWrapper>
      <MainStyled>
        <DiseasePage />
      </MainStyled>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  background-color: #0051b8;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainStyled = styled.div`
  background-color: #fff;
  min-width: 800px;
  max-width: 800px;
  min-height: 90vh;
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 30px 60px -5px #000;
`;
