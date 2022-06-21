import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';
import { RouteList } from './RouteList';
import { LoginPage } from '@src/pages/login';
import { MainPage } from '@src/pages/main';
import { DiseasePage } from '@src/pages/disease/DiseasePage';

export function NormalRouter() {
  return (
    <BodyStyled>
      <Routes>
        <Route path={RouteList.LOGIN} element={<LoginPage />} />
        <Route path={RouteList.MAIN} element={<MainPage />} />
        <Route path={RouteList.DISEASE} element={<DiseasePage />} />
      </Routes>
    </BodyStyled>
  );
}

const BodyStyled = styled.div``;
