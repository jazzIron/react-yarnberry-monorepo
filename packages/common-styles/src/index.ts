import { ITheme } from './emotion/types';
import defaultTheme from './emotion/defaultTheme';
import colors from './emotion/colors';
import fonts from './emotion/fonts';
import cssx from './emotion/style';
import GlobalStyle from './asset/GlobalStyle';

export type ThemeType = ITheme;
export { defaultTheme as theme, fonts, cssx, colors };
export { GlobalStyle };
