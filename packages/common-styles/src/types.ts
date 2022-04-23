import { IColor } from './colors';
import { IFont } from './fonts';
import { ICssx } from './style';

export interface ITheme {
  colors: IColor;
  fonts: IFont;
  cssx: ICssx;
}
