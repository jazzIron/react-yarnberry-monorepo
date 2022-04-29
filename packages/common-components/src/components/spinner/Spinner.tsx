import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import { ISpinner, SPINNER_THEME, SPINNER_SIZE, SPINNER_TYPE } from './Spinner_types';
import Loader from 'react-loader-spinner';

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

// TODO: ERROR 수정 필요
export function Spinner({ type, theme, size, content, onActive, fullCover, height }: ISpinner) {
  const themeStyle = spinnerTheme[theme];
  const spinnerSize = setSpinnerSize(size);
  const loader = (
    <SpinnerStyled themeStyle={themeStyle}>
      <Loader
        type={type}
        color="#4AC6FF"
        height={spinnerSize.height}
        width={spinnerSize.width}
      ></Loader>
      {content && <ContentStyled>{content}</ContentStyled>}
    </SpinnerStyled>
  );
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
  type: SPINNER_TYPE.THREEDOTS,
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
