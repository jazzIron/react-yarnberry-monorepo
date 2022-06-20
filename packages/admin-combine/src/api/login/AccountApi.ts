import { AxiosRequestConfig } from 'axios';
import { MEMBER_ADMIN } from '../constant';
import { api } from '../Instance';

export const signIn = async (param: { email: string; password: string }) => {
  const apiConfig: AxiosRequestConfig = {
    url: MEMBER_ADMIN.ACCOUNT.SIGNIN,
    method: 'POST',
    data: {
      ...param,
    },
  };

  return api(apiConfig);
};

export const modifyPwd = (param: {
  password: string;
  changePassword: string;
  confirmChangePassword: string;
}) => {
  const apiConfig: AxiosRequestConfig = {
    url: MEMBER_ADMIN.MEMBER.CHANGE_PASSWORD,
    method: 'PATCH',
    data: {
      ...param,
    },
  };

  return api(apiConfig);
};

export const modifyinitPwd = (param: {
  email: string;
  password: string;
  changePassword: string;
  confirmChangePassword: string;
}) => {
  const apiConfig: AxiosRequestConfig = {
    url: MEMBER_ADMIN.MEMBER.CHANGE_INIT_PASSWORD,
    method: 'PATCH',
    data: {
      ...param,
    },
  };

  return api(apiConfig);
};
