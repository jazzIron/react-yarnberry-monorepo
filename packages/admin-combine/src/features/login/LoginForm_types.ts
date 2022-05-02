import { ROLE_TYPE } from '@src/@types/Global_types';

export interface ISignInParams {
  email: string;
  password: string;
}

export interface ISignInData {
  accessToken: string;
  accessTokenExpireIn: number;
  refreshToken: string;
  id: number;
  hospitalId: number;
  hospitalName: string;
  temporarily: boolean;
  userRoleTypeName: ROLE_TYPE;
  name: string;
}
