import styled from '@emotion/styled';
import { DiseaseList } from '@src/features/disease/DiseaseList';

export function DiseasePage() {
  return (
    <DiseasePageStyled>
      <DiseaseList />
    </DiseasePageStyled>
  );
}

const DiseasePageStyled = styled.div`
  width: 100%;
  max-width: 800px;
`;
