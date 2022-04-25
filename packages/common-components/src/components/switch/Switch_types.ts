interface ISwitchValue {
  [key: string]: boolean;
}

export interface ISwitch {
  label?: string;
  value: string;
  disabled: boolean;
  onClick: (value: ISwitchValue) => void;
  theme: SWITCH_THEME;
}

export interface ISwitchBox {
  onSwitch: boolean;
  disabled: boolean;
  themeColor: string;
}

export enum SWITCH_THEME {
  DEFAULT = 'DEFAULT',
  RED = 'RED',
}
