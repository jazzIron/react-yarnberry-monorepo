import '@emotion/react';
import { Themes } from './Theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof Themes.colors;
    fonts: typeof Themes.fonts;
    // cssx: typeof Themes.cssx;
  }
}
