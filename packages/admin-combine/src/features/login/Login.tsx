import styled from '@emotion/styled';
import { Button } from '@common/components/src/components/button';

export function Login() {
  const handleClick = () => true;
  return (
    <>
      <LoginWrapper>
        로그인페이지
        <Button onClick={handleClick} label={'테스트'} />
      </LoginWrapper>
    </>
  );
}

const LoginWrapper = styled.div`
  padding: 140px 0;
`;
