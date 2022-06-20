import styled from '@emotion/styled';
import { useState } from 'react';
import { ISignInParams } from './LoginForm_types';
import { LoginFormItem } from './LoginFormItem';
import { useLoginForm } from './useLoginForm';
import {
  Button,
  BUTTON_SIZE,
  BUTTON_THEME,
  CheckBox,
  CHECKBOX_TXT_SIZE,
  Form,
  IFormData,
  useFormHooks,
} from '@common/components';
import { IApiResponse } from '@src/@types/Global_types';
import { signIn } from '@src/api/login/AccountApi';

export function LoginForm({
  loginOption,
  idSave,
  onToggleIdSave,
}: {
  loginOption: IFormData[];
  idSave: boolean;
  onToggleIdSave: () => void;
}) {
  const { formData, formRef, onSubmit, submitDisabled } = useFormHooks(loginOption);
  const { onLoginSuccess, onLoginFail } = useLoginForm();
  // const { setModifyPwd } = useSetModifyPwd();
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (signInParams: ISignInParams) => {
    const response = (await signIn(signInParams)) as IApiResponse<any>;

    if (signInParams && response) {
      if (response.data) {
        if (response.status === 0 && !response.data.temporarily) {
          onLoginSuccess(response.data, signInParams.email, idSave);
          return;
        }
      }
      // if (response.status === 605) {
      //   setModifyPwd({
      //     email: signInParams.email,
      //     tempUser: true,
      //     title: ModifyPwdTitles,
      //   });
      //   return;
      // } else if (response.message) {
      //   onLoginFail([response.message]);
      // }

      alert(response.message);
    }
    setLoading(false);
  };

  const onClickSubmit = () => {
    if (loading === false) {
      setLoading(true);
      onSubmit();
    }
  };

  return (
    <>
      <LoginFormWrapper>
        <Form register={formRef} onSubmit={onSubmitHandler}>
          <FormWrap>
            <LoginFormItem formData={formData} />
          </FormWrap>
        </Form>
        <CheckWrap>
          <CheckBox
            label={'ID 기억하기'}
            textSize={CHECKBOX_TXT_SIZE.DEFAULT}
            onChange={onToggleIdSave}
            isChecked={idSave}
          />
          <Button
            type="submit"
            onClick={onClickSubmit}
            label={'로그인'}
            theme={BUTTON_THEME.PRIMARY}
            size={BUTTON_SIZE.LARGE}
            isDisabled={submitDisabled}
          />
        </CheckWrap>
      </LoginFormWrapper>
    </>
  );
}

const LoginFormWrapper = styled.div`
  button {
    width: 100%;
    margin-top: 5px;
  }
`;
const FormWrap = styled.div`
  height: 139px;
  > div + div {
    margin-top: 15px;
  }
`;

const CheckWrap = styled.div``;
