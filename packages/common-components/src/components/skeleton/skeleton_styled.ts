import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export enum SKELETON_SIZE {
  XSMALL = 'XSMALL',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  XLARGE = 'XLARGE',
}

const loading = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(460px);
  }
`;

const skeletonBefore = (width = 50) => css`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: ${width}px;
  height: 100%;
  background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  animation: ${loading} 3s infinite linear;
`;

const skeletonItemSizeStyled = (itemSize = 'MEDIUM') => {
  switch (itemSize) {
    case 'XSMALL':
      return css`
        width: 30%;
        height: 8px;
        margin-top: 3px;
      `;
    case 'SMALL':
      return css`
        width: 50%;
        height: 12px;
        margin-top: 5px;
      `;
    case 'LARGE':
      return css`
        width: 90%;
        height: 20px;
        margin-top: 6px;
      `;
    case 'XLARGE':
      return css`
        width: 100%;
        height: 20px;
        margin-top: 7px;
      `;
    default:
      return css`
        width: 70%;
        height: 16px;
        margin-top: 5px;
      `;
  }
};

export const SkeletonWrapper = styled.div<{
  gap: number;
  padding: number;
  height: number;
  bordered: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${(props) => props.padding}px;
  border: ${(props) => props.padding}px;
  border: ${(props) => (props.bordered ? css`1px solid #ccc` : css`none`)};
  border-radius: 4px;
  min-height: ${(props) => props.height}px;
  gap: ${(props) => props.gap}px;
`;

export const SkeletonImgWrapper = styled.div``;
export const SkeletonImg = styled.div<{ imageSize: number }>`
  width: ${(props) => props.imageSize}px;
  height: ${(props) => props.imageSize}px;
  border-radius: 50%;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;
  ::before {
    ${(props) => skeletonBefore(props.imageSize)};
  }
`;

export const SkeletonInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SkeletonContentItem = styled.div<{ size: SKELETON_SIZE }>`
  ${(props) => skeletonItemSizeStyled(props.size)};
  background: #f2f2f2;
  position: relative;
  overflow: hidden;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 3s infinite linear;
  }
`;
