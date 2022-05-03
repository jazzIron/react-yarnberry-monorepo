import { CSSProperties } from 'react';
import { BUTTON_THEME } from '../button';

export enum ALERT_THEME {
  NOTICE = 'NOTICE',
  CONFIRM = 'CONFIRM',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  ELEMENT = 'ELEMENT',
  FAIL = 'FAIL',
}

export interface IAlert {
  isOpen: boolean;
  theme: ALERT_THEME;
  title?: string;
  contents?: string[];
  elements?: JSX.Element;
  useReqClose: boolean;
  btnOk: {
    label: string;
    onClick: () => void;
  };
  btnClose?: {
    label: string;
    onClick: (state: false) => void;
  };
}

export interface IAlertThemeStyles {
  [key: string]: { icon: string; size: CSSProperties; closeTheme?: BUTTON_THEME };
}
