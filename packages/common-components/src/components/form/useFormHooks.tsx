import { isArray, isEqual } from 'lodash';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IFormData, IOptionData } from './Form_types';

function defaultValueParsing(option: IFormData[]): {
  [key: string]: string;
} {
  let result = {};
  option.forEach((opt) => {
    if (isArray(opt.option)) {
      let temp = {};
      // const values = opt.option.map((obj) => ({ [obj.name]: obj.defaultValue }));
      opt.option.forEach((obj) => {
        temp = { ...temp, [obj.name]: obj.defaultValue };
      });
      result = { ...result, [opt.id]: [temp] };
    } else {
      result = { ...result, [opt.id]: opt.option.defaultValue };
    }
  });

  return result;
}

function optionDataParsing<T>(option: IFormData[], control: T, mode: string): IOptionData<T> {
  let result = {};
  option.forEach((opt) => {
    if (isArray(opt.option)) {
      result = { ...result, [opt.id]: { control, option: opt.option, id: opt.id, mode } };
    } else {
      result = { ...result, [opt.id]: { control, option: { ...opt.option }, id: opt.id, mode } };
    }
  });

  return result;
}

export function useFormHooks(option: IFormData[], mode?: 'onChange' | 'onSubmit') {
  const submitMode = mode ? mode : 'onChange';
  const defaultValues = defaultValueParsing(option);
  const { control, reset, handleSubmit, watch, formState } = useForm({
    defaultValues,
    mode: submitMode,
    reValidateMode: submitMode,
    shouldFocusError: true,
  });

  const formData = optionDataParsing<typeof control>(option, control, submitMode);
  const submitDisabled = !formState.isValid ? true : false;

  const formRef = useRef<HTMLFormElement>(null);
  const [refresh, setRefresh] = useState(0);

  const onReset = () => {
    const defaultValues = defaultValueParsing(option);
    reset(defaultValues);
  };

  //submit button click
  const onSubmit = () => {
    setRefresh((prev) => prev + 1);
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return {
    onReset,
    watch,
    onSubmit,
    formData,
    formRef: { formRef, handleSubmit, refresh },
    isValid: formState.isValid,
    submitDisabled,
    // setFormItem,
    // render,
  };
}
