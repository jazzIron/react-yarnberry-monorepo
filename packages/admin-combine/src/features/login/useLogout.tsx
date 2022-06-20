import { clearSession } from '@common/utils';
import { getSigninState, loginUserStorageState } from '@src/store/login/LoginState';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState, useRecoilValue } from 'recoil';

export function useLogout() {
  const navigate = useNavigate();
  const loginUserStorageReset = useResetRecoilState(loginUserStorageState);
  const signinState = useRecoilValue(getSigninState);
  const [loading, setLoading] = useState(false);

  // const { setOpenAlert, onCloseAlert } = useAlert();

  const onLogout = async () => {
    setLoading(true);
    loginUserStorageReset();
  };

  const onLogoutSubmit = () => {
    // setOpenAlert({
    //   theme: ALERT_THEME.CONFIRM,
    //   title: '로그아웃',
    //   contents: [`로그아웃 하시겠습니까?`],
    //   useReqClose: true,
    //   onOk: () => {
    //     onLogout();
    //     onCloseAlert();
    //   },
    //   onClose: onCloseAlert,
    //   okLabel: '확인',
    //   closeLabel: '취소',
    // });
    onLogout();
  };

  useEffect(() => {
    if (loading && signinState === 'N') {
      console.log('logout');
      clearSession();
      window.location.reload();
      setLoading(false);
    }
  }, [loading, signinState]);

  return {
    onLogoutSubmit,
    onLogout,
  };
}
