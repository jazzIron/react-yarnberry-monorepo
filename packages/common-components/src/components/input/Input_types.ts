import { INPUT_TYPE } from './InputForm_types';

/*test222*/
// export enum INPUT_TYPE {
//   TEXT = 'text',
//   PASSWORD = 'password',
// }

export interface IInput {
  /**
   * INPUT TYPE
   */
  type: INPUT_TYPE;
  /**
   * INPUT theme
   */
  inputValue: string;
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
   * Optional change handler
   */
  onChange: (value: string) => void;
}
