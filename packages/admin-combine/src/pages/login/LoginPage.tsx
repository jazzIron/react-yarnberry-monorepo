import styled from '@emotion/styled';
import { Login } from '@src/features/login/Login';

export function LoginPage() {
  return (
    <LoginPageWrapper>
      <Login />
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div``;
