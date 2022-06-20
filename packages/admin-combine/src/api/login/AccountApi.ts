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
