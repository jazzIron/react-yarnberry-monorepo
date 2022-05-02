import { FormItem, InputForm, INPUT_TYPE, IOptionData } from '@common/components';

export function LoginFormItem({ formData }: { formData: IOptionData<any> }) {
  return (
    <>
      <FormItem
        {...formData['email']}
        render={({ value, onChange, renderState }) => (
          <InputForm
            type={INPUT_TYPE.TEXT}
            inputValue={value}
            renderState={renderState}
            onChange={(value) => onChange(value.trim())}
            placeholder={'아이디(E-Mail)를 입력해주세요.'}
          />
        )}
      />
      <FormItem
        {...formData['password']}
        render={({ value, onChange, renderState }) => (
          <InputForm
            type={INPUT_TYPE.PW}
            inputValue={value}
            renderState={renderState}
            onChange={(value) => onChange(value.trim())}
            placeholder={'비밀번호를 입력해주세요.'}
          />
        )}
      />
    </>
  );
}
