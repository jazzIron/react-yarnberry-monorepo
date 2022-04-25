import styled from '@emotion/styled';
import { Card } from './Card';
import { SELECT_TYPE } from './Card_types';
import useCard from './useCard';

const sampleData = () => {
  const array = [];
  for (let i = 1; i <= 20; i++) {
    array.push({ id: i, content: `card ${i}`, isSelected: false });
  }
  return array;
};
export function TestPage({ type }: { type: SELECT_TYPE }) {
  const { Contents, selected, onClick } = useCard({ type, contents: sampleData() });

  return (
    <TestPageStyled>
      {Contents.map((data) => (
        <Card
          key={data.id.toString()}
          id={data.id}
          content={data.content}
          onClick={() => onClick(data)}
          isSelected={data.isSelected}
        />
      ))}
    </TestPageStyled>
  );
}

const TestPageStyled = styled.div``;
