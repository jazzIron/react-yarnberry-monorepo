import { SerializedStyles } from '@emotion/react';

export enum SELECT_SIZE {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export interface ISelect {
  /**
   * Size of Select input
   */
  size: SELECT_SIZE;
  /**
   * Initial selected option
   */
  defaultValue?: string;
  /**
   * Whether disabled select
   */
  disabled: boolean;
  /**
   * Select options
   */
  options: ISelectOptionItems[];
  /**
   * Placeholder of select
   */
  placeholder: string;
  /**
   * input value change
   */
  onChange: (value: ISelectOptionItems) => void;
}

export interface ISelectOption {
  /**
   * Size of Select input
   */
  size: SerializedStyles;
  /**
   * Select options
   */
  options: ISelectOptionItems[];
  /**
   * input value change
   */
  onChange: (value: ISelectOptionItems) => void;
}

export interface ISelectOptionItems {
  id: string;
  label: string;
  value: string;
  disabled: boolean;
}
