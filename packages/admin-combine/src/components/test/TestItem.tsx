import styled from '@emotion/styled';
import { Test } from '@components/test/Test';

export function TestItem() {
  return (
    <TestItemStyled>
      <Test />
    </TestItemStyled>
  );
}

const TestItemStyled = styled.div``;
