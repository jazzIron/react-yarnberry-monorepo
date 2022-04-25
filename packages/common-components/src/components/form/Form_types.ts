import { RefObject } from 'react';
import {
  FieldArrayWithId,
  RegisterOptions,
  UseControllerReturn,
  UseFieldArrayReturn,
} from 'react-hook-form';

export enum FORM_VALIDATE_TYPE {
  REQUIRED = 'REQUIRED',
  EMAIL = 'EMAIL',
  PWD = 'PWD',
  BIRTH = 'BIRTH',
  NUMBER = 'NUMBER',
}

export enum RENDER_STATE {
  DEFAULT = 'DEFAULT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface IFormData {
  id: string;
  option: FormSingleType | FormArrayType[];
}

export interface IFormOption {
  defaultValue: IDefaultValue | { [key: string]: IDefaultValue };
  validate: { type: FORM_VALIDATE_TYPE; name: string; failMsg: string }[];
  sucMsg?: string;
}

export interface IOptionData<T> {
  [key: string]: {
    id: string;
    control: T;
    option: IFormOption;
    mode: IFormSubmitMode;
  };
}

export interface IForm {
  register: {
    formRef: RefObject<HTMLFormElement>;
    handleSubmit: any;
    refresh: number;
  };
  onSubmit: (...event: any) => void;
  children: JSX.Element | JSX.Element[] | null;
}

export interface IFormItem {
  id: string;
  control: any;
  option: IFormOption;
  mode: IFormSubmitMode;
  render: (param: IFormItemField) => JSX.Element;
  useMessage: boolean;
  validate?: IFormItemValidate[];
}

export type IFormItemValidate = {
  id: string;
  check: (value: any) => boolean;
  failMsg: string;
};

export interface IFormArray {
  control: any;
  id: string;
  option: any; // FormArrayType[]
  mode: IFormSubmitMode;
  render: (param: IFormArrayRender) => JSX.Element;
}

export type IDefaultValue = string | boolean | number | File;
export type IFormSubmitMode = 'onChange' | 'onSubmit';
export type FormSingleType = IFormOption;
export type FormArrayType = IFormOption & { name: string };
export type IValidate = RegisterOptions['validate'];
export type IFormItemField = UseControllerReturn['field'] &
  UseControllerReturn['fieldState'] & { renderState: RENDER_STATE };
interface IFormArrayRender extends Pick<UseFieldArrayReturn, 'append' | 'prepend'> {
  field: FieldArrayWithId;
  onRemove: () => void;
  formArrayData: IOptionData<any>;
}
