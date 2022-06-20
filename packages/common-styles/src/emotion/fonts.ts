import { css, SerializedStyles } from '@emotion/react';

const fonts: { [key: string]: SerializedStyles } = {
  h0: css`
    font-family: 'NotoSansCJKkrBold';
    font-size: 24px;
    line-height: 34px;
  `,
  h1_b: css`
    font-family: 'NotoSansCJKkrBold';
    font-size: 20px;
    line-height: 28px;
  `,
  h1: css`
    font-family: 'NotoSansCJKkrRegular';
    font-size: 20px;
    font-weight: normal;
    line-height: 28px;
  `,
  h2_b: css`
    font-family: 'NotoSansCJKkrBold';
    font-size: 18px;
    line-height: 28px;
  `,
  h2: css`
    font-family: 'NotoSansCJKkrRegular';
    font-size: 18px;
    font-weight: normal;
    line-height: 25px;
  `,
  body_01_b: css`
    font-family: 'NotoSansCJKkrBold';
    font-size: 16px;
    line-height: 24px;
  `,
  body_01: css`
    font-family: 'NotoSansCJKkrRegular';
    font-size: 16px;
    font-weight: normal;
    line-height: 24px;
  `,
  body_02_b: css`
    font-family: 'NotoSansCJKkrBold';
    font-size: 14px;
    line-height: 22px;
  `,
  body_02: css`
    font-family: 'NotoSansCJKkrRegular';
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
  `,
  body_03_b: css`
    font-family: 'NotoSansCJKkrBold';
    font-size: 12px;
    line-height: 20px;
  `,
  body_03: css`
    font-family: 'NotoSansCJKkrRegular';
    font-size: 12px;
    font-weight: normal;
    line-height: 20px;
  `,
  p1: css`
    font-family: 'NotoSansCJKkrRegular';
    font-size: 10px;
    font-weight: normal;
    line-height: 18px;
  `,
};

export type IFont = typeof fonts;
export default fonts;
