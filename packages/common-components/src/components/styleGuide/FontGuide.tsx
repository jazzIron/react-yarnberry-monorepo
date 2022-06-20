import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { colors, fonts } from '@common/styles';

interface PropTypes {
  [index: string]: string;
  type: string;
}

export function FontGuide({ type }: PropTypes) {
  const fontStyles = fonts[type];

  return (
    <FontGuideWrapper>
      <FontGuideStyled>
        <FontTitleStyled>{type}</FontTitleStyled>
        <FontContentStyled fontStyles={fontStyles}>문구 스타일 가이드 체크</FontContentStyled>
      </FontGuideStyled>
    </FontGuideWrapper>
  );
}

const FontGuideWrapper = styled.div`
  padding: 8px;
`;

const FontGuideStyled = styled.div`
  display: flex;
  gap: 16px;
  padding: 10px;
`;

const FontContentStyled = styled.div<{ fontStyles: SerializedStyles }>`
  ${(props) => props.fontStyles}
  border: 1px solid #2b2929;
`;

const FontTitleStyled = styled.div`
  min-width: 120px;
`;
