import styled from '@emotion/styled';
import { Space, SPACE_DIRECTION } from '@common/components';
import { TestRouteList } from '@src/routes/TestRouteList';
import { Link } from 'react-router-dom';

export function AgTablePage() {
  const TEST_ROOT_PATH = '/test';
  return (
    <TestTablePageStyled>
      <Space direction={SPACE_DIRECTION.VERTICAL} gap={20}>
        <Link to={TEST_ROOT_PATH + TestRouteList.TEST_TABLE_BASIC}>AgTable Basic</Link>
      </Space>
    </TestTablePageStyled>
  );
}

const TestTablePageStyled = styled.div``;
