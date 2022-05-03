import '@emotion/react';
import { IColor } from './colors';
import { ICssx } from './style';
import { IFont } from './fonts';
import { ITheme } from './types';

declare module '@emotion/react' {
  interface Theme extends ITheme {}
}
