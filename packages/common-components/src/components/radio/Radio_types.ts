export enum RADIO_SIZE {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
}

export enum RADIO_THEME {
  DEFAULT = 'DEFAULT',
  BUTTON = 'BUTTON',
}

export interface IRadio {
  id: string;
  label: string;
  disabled: boolean;
  value: string;
}

export interface IRadioGroup {
  theme: RADIO_THEME;
  size: RADIO_SIZE;
  options: IRadio[];
  value: string | number | boolean;
  gap: string;
  onChange: (value: string) => void;
}
