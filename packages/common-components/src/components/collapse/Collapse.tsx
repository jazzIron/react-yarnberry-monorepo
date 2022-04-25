import styled from '@emotion/styled';
import { ICollapse } from './Collapse_types';
import { CollapseItem } from './CollapseItem';

export function Collapse({ contents }: ICollapse) {
  return (
    <CollapseStyled>
      {contents.map((content) => (
        <CollapseItem key={content.id} item={content} />
      ))}
    </CollapseStyled>
  );
}

const CollapseStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
