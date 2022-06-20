import { getCookie, cookieKey, setCookie, removeCookie, clearSession } from '@common/utils';
import { RouteList } from '@src/routes/RouteList';
import {
  loginHospitalStorageState,
  loginUserStorageState,
  getSigninState,
} from '@src/store/login/LoginState';
import { isEmpty, isEqual } from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ISignInData } from './LoginForm_types';
import { useRemoveAllLocalStorage } from '@src/hooks/localStorage/useLocalStorage';

import moment from 'moment';

export function useLoginForm() {
  const navigate = useNavigate();
  const { removeAllItem: removeLocalStorage } = useRemoveAllLocalStorage();
  // const { setOpenAlert, onCloseAlert } = useAlert();
  const setHospitalStorage = useSetRecoilState(loginHospitalStorageState);
  const setUserStorage = useSetRecoilState(loginUserStorageState);
  const signinState = useRecoilValue(getSigninState);

  const onLoginSuccess = (data: ISignInData, email: string, idSave: boolean) => {
    if (idSave) {
      const alreadySaved = getCookie(cookieKey);
      console.log(alreadySaved);
      if (!alreadySaved) {
        setCookie(cookieKey, email);
      } else {
        if (alreadySaved !== email) {
          removeCookie(cookieKey);
          setCookie(cookieKey, email);
        }
      }
    }

    if (data && !isEmpty(data)) {
      const { id, hospitalId, hospitalName, accessToken, refreshToken, userRoleTypeName, name } =
        data;

      setUserStorage((prev) => {
        return {
          ...prev,
          id: id.toString(),
          type: userRoleTypeName,
          name,
        };
      });
      setHospitalStorage({
        id: String(hospitalId),
        name: hospitalName,
      });

      localStorage.setItem('curTimer', moment().format());
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // if (userRoleTypeName === 'DOCTOR') setSession('doctorTreatStatus', 'OFF');
    }

    navigate(RouteList.MAIN);
  };

  const onLoginFail = (message: string[]) => {
    // setOpenAlert({
    //   theme: ALERT_THEME.WARNING,
    //   contents: message,
    //   onOk: () => onCloseAlert,
    //   okLabel: '확인',
    // });
    alert(message);
  };

  useEffect(() => {
    if (isEqual(signinState, 'Y')) {
      navigate(RouteList.MAIN);
    } else {
      removeLocalStorage();
      clearSession();
    }
  }, []);

  return {
    onLoginSuccess,
    onLoginFail,
  };
}
