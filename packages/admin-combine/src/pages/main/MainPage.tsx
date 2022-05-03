import styled from '@emotion/styled';

export function MainPage() {
  console.log(process.env.REACT_APP_MODE);
  return <MainPageStyled>메인페이지</MainPageStyled>;
}

const MainPageStyled = styled.div``;
