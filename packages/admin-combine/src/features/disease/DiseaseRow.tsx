import styled from '@emotion/styled';
import { DiseaseListApi } from '@src/store/disease/DiseaseState';

interface propTypes {
  diseaseItem: DiseaseListApi;
}

export function DiseaseRow({ diseaseItem }: propTypes) {
  return (
    <DiseaseRowWrapper>
      <div>{diseaseItem.diseaseId}</div>
      <div>{diseaseItem.diseasePartName}</div>
      <div>{diseaseItem.diseaseName}</div>
      <div>{diseaseItem.diseaseDefinition}</div>
    </DiseaseRowWrapper>
  );
}

const DiseaseRowWrapper = styled.div`
  border: 1px solid #dedee6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  > div:last-child {
    margin-bottom: 0px;
  }
`;
