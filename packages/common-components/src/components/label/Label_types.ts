export enum LABEL_THEME {
  ROUND = 'ROUND',
  DEFAULT = 'DEFAULT',
  REMOVE = 'REMOVE',
}

export enum LABEL_COLOR {
  RED = 'RED',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
}

export interface ILabel {
  theme: LABEL_THEME;
  color: LABEL_COLOR;
  options: ILabelOptionItems[];
  isRemove: boolean;
  onRemove: (id: string) => void;
  // onChange: (value: ILABELOptionItems) => void;
}

export interface ILabelOptionItems {
  id: string;
  label: string;
  hidden: boolean;
}
