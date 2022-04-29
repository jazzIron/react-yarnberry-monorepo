import styled from '@emotion/styled';
import { Button, BUTTON_THEME } from '@common/components';

export function Login() {
  const handleClick = () => true;
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
