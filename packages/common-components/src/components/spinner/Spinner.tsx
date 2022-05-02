import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import { ISpinner, SPINNER_THEME, SPINNER_SIZE, SPINNER_TYPE } from './Spinner_types';
import {
  Audio,
  BallTriangle,
  Bars,
  Circles,
  CirclesWithBar,
  Grid,
  Hearts,
  LineWave,
  MutatingDots,
  Oval,
  Plane,
  Puff,
  RevolvingDot,
  RotatingSquare,
  Rings,
  TailSpin,
  ThreeDots,
  ThreeCircles,
  Triangle,
  Watch,
  RotatingLines,
  FallingLines,
  InfinitySpin,
} from 'react-loader-spinner';

const setSpinnerSize = (size: SPINNER_SIZE) => {
  switch (size) {
    case 'SMALL':
      return {
        width: 30,
        height: 30,
      };
    case 'MEDIUM':
      return {
        width: 40,
        height: 40,
      };
    default:
      return {
        width: 80,
        height: 80,
      };
  }
};

const spinnerRenderItem = (
  type: string,
  spinnerSize: { width: number; height: number },
  content: string,
) => {
  switch (type) {
    case SPINNER_TYPE.AUDIO: {
      return (
        <Audio color="#4AC6FF" height={spinnerSize.height} width={spinnerSize.width}>
          {content && <ContentStyled>{content}</ContentStyled>}
        </Audio>
      );
    }
    case SPINNER_TYPE.BALLTRIANGLE: {
      return (
        <BallTriangle color="#4AC6FF" height={spinnerSize.height} width={spinnerSize.width}>
          {content && <ContentStyled>{content}</ContentStyled>}
        </BallTriangle>
      );
    }
    default: {
      return (
        <Oval color="#4AC6FF" height={spinnerSize.height} width={spinnerSize.width}>
          {content && <ContentStyled>{content}</ContentStyled>}
        </Oval>
      );
    }
  }
};

export function Spinner({ type, theme, size, content, onActive, fullCover, height }: ISpinner) {
  const themeStyle = spinnerTheme[theme];
  const spinnerSize = setSpinnerSize(size);
  const renderItme = spinnerRenderItem(type, spinnerSize, content);
  const loader = <SpinnerStyled themeStyle={themeStyle}>{renderItme}</SpinnerStyled>;
  if (!onActive) return null;
  return (
    <LoadingWrapper fullCover={fullCover} height={height}>
      {loader}
    </LoadingWrapper>
  );
}

const spinnerTheme = {
  [SPINNER_THEME.DEFAULT]: css`
    background-color: transparent;
    color: #000;
  `,
  [SPINNER_THEME.MASK]: css`
    background-color: #797979;
    color: #fff;
  `,
};

Spinner.defaultProps = {
  theme: SPINNER_THEME.DEFAULT,
  type: SPINNER_TYPE.BALLTRIANGLE,
  size: SPINNER_SIZE.MEDIUM,
  content: '',
  onActive: false,
  fullCover: true,
  height: '100%',
};

const SpinnerStyled = styled.div<{ themeStyle: SerializedStyles }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  ${(props) => props.themeStyle};
`;

const LoadingWrapper = styled.div<{ fullCover: boolean; height: string }>`
  ${(props) =>
    props.fullCover
      ? css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 10;
          overflow: hidden;
          height: 100vh;
          background: #b8b8ba78;
        `
      : css`
          height: ${props.height}px;
        `}
`;

const ContentStyled = styled.div`
  margin-top: 20px;
`;
