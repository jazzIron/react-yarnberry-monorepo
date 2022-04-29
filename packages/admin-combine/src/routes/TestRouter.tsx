import styled from '@emotion/styled';
import { RecoilAtomEffect } from '@src/pages/testPage/recoil/RecoilAtomEffect';
import { RecoilLoadableTester } from '@src/pages/testPage/recoil/RecoilLoadableTester';
import { RecoilTesterPage } from '@src/pages/testPage/recoil/RecoilTesterPage';
import { theme as Themes, cssx } from '@common/styles';
import { Route, Routes } from 'react-router-dom';

import { TestRouteList } from './TestRouteList';

export function TestRouter() {
  return (
    <BodyStyled>
      <Routes>
        <Route path={TestRouteList.TEST_RECOIL} element={<RecoilTesterPage />} />
        <Route path={TestRouteList.TEST_RECOIL_LOADABLE} element={<RecoilLoadableTester />} />
        <Route path={TestRouteList.TEST_RECOIL_ATOM_EFFECT} element={<RecoilAtomEffect />} />
      </Routes>
    </BodyStyled>
  );
}

const BodyStyled = styled.div`
  ${cssx.contentWidth};
  min-height: 700px;
  margin: 0 auto;
  padding: 50px 30px;
`;
