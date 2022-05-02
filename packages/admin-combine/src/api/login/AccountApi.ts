import { ISignInParams } from '@src/store/login/LoginState';
import { IChangePwRequestData } from '@src/store/login/ModifyPwdState';
import { AxiosRequestConfig } from 'axios';

import { api } from '../Instance';

export const getEmailDuplicate = async (param: { email: string }) => {
  const apiConfig: AxiosRequestConfig = {
    url: `/api/hospital/accounts/checkEmailDuplicate?email=${param.email}`,
    method: 'GET',
  };

  return api(apiConfig);
};

export const signIn = async (param: ISignInParams) => {
  const apiConfig: AxiosRequestConfig = {
    url: `/api/hospital/accounts/signIn`,
    method: 'POST',
    data: { ...param },
  };
  return api(apiConfig);
};

export const changePassword = async (param: IChangePwRequestData) => {
  const apiConfig: AxiosRequestConfig = {
    url: `/api/hospital/members/changePassword`,
    method: 'PATCH',
    data: { ...param },
  };
  return api(apiConfig);
};

export const changeTempPassword = async (param: IChangePwRequestData) => {
  const apiConfig: AxiosRequestConfig = {
    url: `/api/hospital/members/initChangePassword`,
    method: 'PATCH',
    data: { ...param },
  };
  return api(apiConfig);
};

//비밀번호 초기화
export const initPassword = async (userId: number) => {
  const apiConfig: AxiosRequestConfig = {
    url: `/api/hospital/managers/initPassword/${userId}`,
    method: 'GET',
  };
  return api(apiConfig);
};

// export const getCheckPassword = async (userId: number, password: string) => {
//   const apiConfig: AxiosRequestConfig = {
//     url: `/api/hospital/accounts/${userId}/checkPassword`,
//     method: 'GET',
//     params: { password },
//   };

//   return api(apiConfig);
// };
