import { IApiResponse } from '@src/@types/Global_types';
import { changePassword, changeTempPassword } from '@src/api/login/AccountApi';
import { atom, atomFamily, SerializableParam } from 'recoil';

export interface IChangePwRequestData {
  email: string;
  password: string;
  changePassword: string;
  confirmChangePassword: string;
}

interface IChangeTempPwRequestData extends IChangePwRequestData {
  tempUser: boolean;
  refresh: number;
  [key: string]: SerializableParam;
}

// interface ITempUserCheck {
//   tempUser: boolean;
//   tempUserEmail: string;
// }
// export const tempUsercheck = atom<ITempUserCheck>({
//   key: 'tempUserCheck',
//   default: { tempUser: false, tempUserEmail: '' },
// });

interface IModifyPwdParam {
  tempUser: boolean;
  email: string;
}

export const modifyPwdParam = atom<IModifyPwdParam>({
  key: 'modifyPwdParam',
  default: {
    tempUser: false,
    email: '',
  },
});

export const modifyPwdQuery = atomFamily<IApiResponse<unknown>, IChangeTempPwRequestData>({
  key: 'updateModifyPwdState',
  default: async (params) => {
    const queryParam = {
      email: params.email,
      password: params.password,
      changePassword: params.changePassword,
      confirmChangePassword: params.confirmChangePassword,
    };

    const res = params.tempUser
      ? await changeTempPassword({ ...queryParam }) //임시 유저 비밀번호 변경
      : await changePassword({ ...queryParam }); //유저 비밀번호 변경
    return res;
  },
  effects_UNSTABLE: [
    ({ resetSelf }) => {
      resetSelf();
    },
  ],
});

export const modifyPwdState = atom<IApiResponse<unknown> | null>({
  key: 'modifyPwdState',
  default: null,
});
