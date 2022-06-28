import { SerializedStyles } from '@emotion/react';

export enum BUTTON_THEME {
  PRIMARY = 'PRIMARY',
  LINEBLUE = 'LINEBLUE',
  LINEBLACK = 'LINEBLACK',
  LINERED = 'LINERED',
  NEGATIVE = 'NEGATIVE',
}

export enum BUTTON_SIZE {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export interface IButton {
  label: string;
  type: 'button' | 'submit';
  onClick: () => void;
  isDisabled: boolean;
  theme: BUTTON_THEME;
  size: BUTTON_SIZE;
  styleBlock: boolean;
  icon?: string;
}

export interface IButtonStyled {
  buttonThemeStyles: SerializedStyles;
  buttonSizeStyles: SerializedStyles;
  styleBlock: boolean;
}

export interface ITextButton {
  label: string;
  onClick: () => void;
  isDisabled: boolean;
  leftIcon?: string;
  rightIcon?: string;
  size: BUTTON_SIZE;
}

export interface ITextButtonStyled {
  buttonSizeStyles: SerializedStyles;
}
