import { colors, fonts } from '@common/styles';
import styled from '@emotion/styled';
import { DiseaseListApiData } from '@src/store/disease/DiseaseState';

interface propTypes {
  diseaseItem: DiseaseListApiData;
}

export function DiseaseRow({ diseaseItem }: propTypes) {
  return (
    <DiseaseRowWrapper>
      <DiseasePartNameWrapper>{diseaseItem.diseasePartName}</DiseasePartNameWrapper>
      <DiseaseNameWrapper>{diseaseItem.diseaseName}</DiseaseNameWrapper>
      <DiseaseDefinitionWrapper>{diseaseItem.diseaseDefinition}</DiseaseDefinitionWrapper>
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
  background-color: ${colors.gray_11};
  cursor: pointer;
`;

const DiseasePartNameWrapper = styled.div`
  ${fonts.body_03};
  color: ${colors.gray_01};
`;
const DiseaseNameWrapper = styled.div`
  ${fonts.h2_b};
  color: ${colors.gray_01};
`;
const DiseaseDefinitionWrapper = styled.div`
  margin-top: 8px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${fonts.body_03};
  color: ${colors.gray_05};
`;
