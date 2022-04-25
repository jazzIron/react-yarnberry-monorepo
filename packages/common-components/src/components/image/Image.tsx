import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IImage, IMAGE_FIT } from './Image_types';

export function Image({ image, width, fit, onClick }: IImage) {
  const onClickHandler = () => {
    if (onClick) onClick();
  };

  return (
    <ImageStyled width={width} fit={fit} onClick={onClickHandler}>
      <img src={image} alt="" />
    </ImageStyled>
  );
}

const ImageStyled = styled.div<{ width?: string; fit?: IMAGE_FIT }>`
  img {
    position: absolute;
    height: 100%;
    width: 100%;
    /* width: ${({ width }) => (width ? width : 'auto')}; */

    ${({ fit }) =>
      fit
        ? css`
            object-fit: ${fit};
          `
        : css``}
  }
`;
