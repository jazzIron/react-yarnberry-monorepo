import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { theme as Themes, colors, cssx, fonts } from '@common/styles';

interface PropTypes {
  [index: string]: string;
  type: string;
}

export function ColorGuide({ type }: PropTypes) {
  const theme = useTheme();
  const colorStyle = colors[type];
  return (
    <ColorsWrapper>
      <span>{type}</span>
      <ColorGuideStyled colorStyle={colorStyle}>{colorStyle}</ColorGuideStyled>
    </ColorsWrapper>
  );
}

const ColorsWrapper = styled.div`
  padding-bottom: 5px;
  span {
    width: 150px;
    line-height: 50px;
    display: inline-block;
  }
`;
const ColorGuideStyled = styled.span<{ colorStyle: string }>`
  padding: 0 5px;
  ${({ colorStyle }) => {
    const fontColor = colorStyle === '#000000' || colorStyle === '#0E1E96' ? '#999' : '#000';
    return css`
      color: ${fontColor};
      background-color: ${colorStyle};
    `;
  }}
`;
