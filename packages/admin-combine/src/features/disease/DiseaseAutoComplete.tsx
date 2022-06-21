import { Label } from '@common/components';
import { colors, fonts } from '@common/styles';
import styled from '@emotion/styled';
import { DiseaseListApiData } from '@src/store/disease/DiseaseState';
import { MouseEvent } from 'react';

interface SearchAutoCompletePropTypes {
  active: boolean;
  autoCompleteData: DiseaseListApiData[] | null | undefined;
  onSelectDisease: (event: React.MouseEvent<HTMLDivElement>, disease: DiseaseListApiData) => void;
}

export function SearchAutoComplete({
  active,
  autoCompleteData,
  onSelectDisease,
}: SearchAutoCompletePropTypes) {
  const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => e.preventDefault();
  return (
    <AutoCompleteWrapper active={active}>
      {active &&
        autoCompleteData &&
        autoCompleteData.map((disease, idx) => {
          const diseasePartLabelOptions = [
            {
              id: String(idx),
              label: disease.diseasePartName,
              hidden: false,
            },
          ];
          return (
            <DiseaseBox
              key={idx}
              onMouseDown={handleMouseDown}
              onClick={(event) => onSelectDisease(event, disease)}
            >
              <DiseasePartNameWrapper>
                {disease.diseasePartName && <Label options={diseasePartLabelOptions} />}
              </DiseasePartNameWrapper>
              <DiseaseNameWrapper>{disease.diseaseName}</DiseaseNameWrapper>
              <DiseaseDefinitionWrapper>{disease.diseaseDefinition}</DiseaseDefinitionWrapper>
            </DiseaseBox>
          );
        })}
    </AutoCompleteWrapper>
  );
}

const AutoCompleteWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  background: rgb(255, 255, 255);
  top: 40px;
  width: 100%;
  overflow: hidden;
  opacity: ${(props) => (props.active ? `1` : `0`)};
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  z-index: 3;
`;

const DiseaseBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  :hover {
    background-color: ${colors.gray_09};
  }
`;

const DiseasePartNameWrapper = styled.div``;
const DiseaseNameWrapper = styled.div`
  ${fonts.body_02_b};
  color: ${colors.gray_01};
`;
const DiseaseDefinitionWrapper = styled.div`
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${fonts.body_03};
  color: ${colors.gray_05};
`;
