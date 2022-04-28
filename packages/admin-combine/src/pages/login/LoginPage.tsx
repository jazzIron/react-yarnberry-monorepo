import styled from '@emotion/styled';
import { Login } from '@src/features/login';

export function LoginPage() {
  return (
    <LoginPageWrapper>
      <Login />
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div``;
