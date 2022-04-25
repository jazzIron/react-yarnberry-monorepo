import { FormEvent, KeyboardEvent } from 'react';
import { IForm, IFormOption } from './Form_types';

export const Form = ({ register, onSubmit, children }: IForm) => {
  const { formRef, handleSubmit, refresh } = register;

  const onKeyHandler = (e: KeyboardEvent<HTMLFormElement>) => {
    //enter로 submit 방지
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit((event: any) => onSubmit(event as IFormOption['defaultValue']))(e).catch(
      (event: any) => {
        console.log('catch', event);
        onSubmit({});
      },
    );
    // .finally(() => setRefresh((prev) => prev + 1));
  };

  return (
    <form ref={formRef} onSubmit={onSubmitHandler} onKeyDown={onKeyHandler}>
      {children}
    </form>
  );
};
