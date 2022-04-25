import styled from '@emotion/styled';
import { ICard } from './Card_types';

export function Card({ content, isSelected, onClick }: ICard) {
  return (
    <CardStyled isSelected={isSelected} onClick={onClick}>
      <div>{content}</div>
    </CardStyled>
  );
}

const CardStyled = styled.div<{ isSelected: boolean }>`
  width: 200px;
  height: 100px;
  border: ${(props) => (props.isSelected ? `solid 2px red` : `solid 1px grey`)};
`;
