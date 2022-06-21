export interface SearchInputPropTypes {
  /**
   * INPUT value
   */
  inputValue: string;
  /**
   * placeholder
   */
  placeholder: string;
  /**
   * allowClear
   */
  allowClear: boolean;
  /**
   * maxLength
   */
  maxLength: number;
  /**
   * change handler
   */
  onChange: (value: string) => void;
  /**
   * Optional onFocus handler
   */
  onFocus?: () => void;
  /**
   * Optional onBlur handler
   */
  onBlur?: () => void;
  /**
   * onSubmit handler
   */
  onSubmit: (value: string) => void;
}
