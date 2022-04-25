export enum SELECT_TYPE {
  MULTIPLE = 'MULTIPLE',
  SINGLE = 'SINGLE',
}

export interface ICard {
  id: number;
  content: string;
  isSelected: boolean;
  onClick?: () => void;
}

export interface IUseCard {
  type: SELECT_TYPE;
  contents: ICard[];
}
