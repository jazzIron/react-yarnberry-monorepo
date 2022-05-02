import styled from '@emotion/styled';
import {
  Button,
  BUTTON_THEME,
  ToastHook,
  TOAST_OPTION_POSITION,
  TOAST_TYPE,
} from '@common/components';

export function Login() {
  const { toastMake } = ToastHook();

  const handleClick = () => {
    toastMake({
      content: '로그인 성공?실패?',
      type: TOAST_TYPE.ERROR,
      options: {
        autoClose: true,
        position: TOAST_OPTION_POSITION.TOP_CENTER,
      },
    });
  };
  return (
    <>
      <LoginWrapper>
        로그인페이지
        <Button theme={BUTTON_THEME.LINEBLUE} onClick={handleClick} label={'테스트'} />
      </LoginWrapper>
    </>
  );
}

const LoginWrapper = styled.div`
  padding: 140px 0;
`;
