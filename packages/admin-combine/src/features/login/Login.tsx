import styled from '@emotion/styled';
import { theme as Themes } from '@common/styles';
import { Button, BUTTON_THEME, Icon, ICON_LIST, IFormData } from '@common/components';
import { useEffect, useState } from 'react';
import { loginOption } from './login.data';
import { cookieKey, getCookie, removeCookie } from '@common/utils';
import { isNull } from 'lodash';
import { LoginForm } from './LoginForm';

export function Login() {
  const [formOption, setFormOption] = useState<IFormData[] | null>(null);
  const [idSave, setIdSave] = useState(false);
  const savedEmail = getCookie(cookieKey);

  const onToggleIdSave = () => {
    if (idSave && savedEmail) {
      removeCookie(cookieKey);
    }
    setIdSave(!idSave);
  };

  useEffect(() => {
    //TODO : id 기억하기 - 1달 유지
    if (savedEmail) {
      setIdSave(true);
      setFormOption(
        loginOption.map((data) =>
          data.id === 'email'
            ? { ...data, option: { ...data.option, defaultValue: savedEmail } }
            : data,
        ),
      );
      return;
    }
    setFormOption(loginOption);
  }, []);

  const handleSampleLogin = () => {
    // setOpenAlert({
    //   theme: ALERT_THEME.ELEMENT,
    //   title: '관리자메뉴',
    //   contents: [''],
    //   elements: <LoginSample />,
    //   useReqClose: true,
    //   onOk: () => {
    //     onCloseAlert();
    //   },
    //   okLabel: '확인',
    //   closeLabel: '취소',
    // });
    return true;
  };

  return (
    <>
      {!isNull(formOption) && (
        <LoginWrapper>
          <LogoWrap onClick={handleSampleLogin}>
            <Icon icon={ICON_LIST.icn_logo} width={'212px'} />
          </LogoWrap>
          <LoginBox>
            <TextWrap>
              <Tetx1>내 손 안의 작은 의사</Tetx1>
              <Text2>어디아파 병원관리자 시스템</Text2>
            </TextWrap>
            <LoginForm loginOption={formOption} idSave={idSave} onToggleIdSave={onToggleIdSave} />
          </LoginBox>
        </LoginWrapper>
      )}
    </>
  );
}

const LoginWrapper = styled.div`
  padding: 140px 0;
`;
const LogoWrap = styled.div`
  width: 212px;
  margin: 0 auto 60px;
  img {
    height: auto !important;
  }
`;

const LoginBox = styled.div`
  position: relative;
  width: 650px;
  height: 431px;
  flex-grow: 0;
  margin: 0 auto;
  padding: 50px 145px;
  border: solid 1px ${Themes.colors.gray_08};
  border-top: 0;
  background-color: ${Themes.colors.gray_11};
  &:before {
    content: '';
    position: absolute;
    left: -1px;
    top: 0;
    display: block;
    width: calc(100% + 2px);
    border-top: 4px solid ${Themes.colors.ays_maincolor};
  }
`;
const TextWrap = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;
const Tetx1 = styled.div`
  color: ${Themes.colors.ays_maincolor};
  ${Themes.fonts.body_01_b}
`;
const Text2 = styled.div`
  margin-top: 5px;
  color: ${Themes.colors.gray_01};
  ${Themes.fonts.h0}
`;
