export enum TEXTAREA_THEME {
  BORDER = 'BORDER',
}

export interface ITextarea {
  theme: TEXTAREA_THEME;
  disabled: boolean;
  placeholder: string;
  value: string;
  maxLength: number;
  readOnly: boolean;
  rows: number;
  isRemove: boolean;
  onChange: (value: string) => void;
}
