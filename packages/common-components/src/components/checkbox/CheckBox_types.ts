export enum CHECKBOX_TXT_SIZE {
  SMALL = 'SMALL',
  DEFAULT = 'DEFAULT',
  BOLD = 'BOLD',
}
export interface ICheckBoxProps {
  label: string;
  value: string;
  isChecked: boolean;
  disabled: boolean;
  suffixIcon?: string;
  onChange: (value: string) => void;
  onClickSuffix?: () => void;
  textSize: CHECKBOX_TXT_SIZE;
}

export interface IValue {
  icon: string;
}

export interface ICheckListOption {
  id: string;
  value: string;
  label: string;
  isRequired: boolean;
  isChecked: boolean;
  disabled?: boolean;
  onClickSuffix?: () => void;
}
export interface ICheckListProps {
  masterLabel: string;
  options: ICheckListOption[];
  onChange: (value: string[]) => void;
  allRequiredCheck: (value: boolean) => void;
  suffixIcon?: string;
}
