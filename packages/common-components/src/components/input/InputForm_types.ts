import { RENDER_STATE } from '../form/Form_types';

export enum INPUT_TYPE {
  TEXT = 'text',
  PW = 'password',
}

export enum INPUT_FORM_THEME {
  DEFAULT = 'DEFAULT',
  // 추가
}

export interface IInputForm {
  /**
   * INPUT TYPE
   */
  type: INPUT_TYPE;
  /**
   * INPUT THEME
   */
  theme: INPUT_FORM_THEME;
  /**
   * INPUT theme
   */
  inputValue: string;
  /**
   * error check
   */
  renderState?: RENDER_STATE;
  /**
   * allowClear
   */
  allowClear: boolean;
  /**
   * placeholder
   */
  placeholder: string;
  /**
   * maxLength
   */
  maxLength: number;
  /**
   * readOnly
   */
  readOnly: boolean;
  /**
   * prefixIcon Item
   */
  prefixIcon?: string;
  /**
   * Optional change handler
   */
  onChange: (value: string) => void;
}
