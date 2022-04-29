import styled from '@emotion/styled';
import { TestRouteList } from '@src/routes/TestRouteList';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Space } from '@common/components/src/components/space/Space';
import { SPACE_DIRECTION } from '@common/components/src/components/space/Space_types';

const TEST_ROOT_PATH = '/test';

export function RecoilTesterPage() {
  return (
    <RecoilTesterPageStyled>
      <Space direction={SPACE_DIRECTION.VERTICAL} gap={20}>
        <Link to={TEST_ROOT_PATH + TestRouteList.TEST_RECOIL_LOADABLE}>recoil_Loadable</Link>
        <Link to={TEST_ROOT_PATH + TestRouteList.TEST_RECOIL_ATOM_EFFECT}>atom_Effect</Link>
      </Space>
    </RecoilTesterPageStyled>
  );
}

const RecoilTesterPageStyled = styled.div``;
