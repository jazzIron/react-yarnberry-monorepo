import styled from '@emotion/styled';
import { theme as Themes, colors, cssx, fonts } from '@common/styles';
import { Route, Routes } from 'react-router-dom';
import { RouteList } from './RouteList';
import { LoginPage } from '@src/pages/login';
import { MainPage } from '@src/pages/main';
import { DiseasePage } from './../pages/disease/DiseasePage';

export function NormalRouter() {
  return (
    <BodyStyled>
      <Routes>
        <Route path={RouteList.LOGIN} element={<LoginPage />} />
        <Route path={RouteList.MAIN} element={<MainPage />} />
        <Route path={RouteList.Disease} element={<DiseasePage />} />
      </Routes>
    </BodyStyled>
  );
}

const BodyStyled = styled.div`
  /* ${cssx.contentWidth};
  min-height: 700px;
  margin: 0 auto;
  padding: 50px 30px; */
`;
