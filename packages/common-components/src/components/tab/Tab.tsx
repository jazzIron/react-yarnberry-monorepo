import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ITab } from './tab_types';

export function Tab({ options, activeId }: ITab) {
  return (
    <TabStyled flex={options.length}>
      {options.map((obj) => (
        <TabOption id={obj.id} key={obj.id} active={obj.id === activeId}>
          {obj.text}
        </TabOption>
      ))}
    </TabStyled>
  );
}

const TabStyled = styled.div<{ flex: number }>`
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  > div {
    ${({ flex }) =>
      css`
        flex: ${flex};
      `}

    text-align: center;
    padding: 10px 5px;
  }
`;

const TabOption = styled.div<{ active: boolean }>`
  ${({ active }) =>
    active
      ? css`
          border-bottom: 3px solid #4ac6ff;
        `
      : css`
          border-bottom: 1px solid #d8d8d8;
        `}
`;
