import { ROLE_TYPE } from '@src/@types/Global_types';
import { IStorageData } from '@src/hooks/localStorage';

export interface ISignInParams {
  email: string;
  password: string;
}

export interface ISignInResponse {
  status: number;
  data: null | ISignInData;
  message: null | string;
}
export interface ISignInData {
  accessToken: string;
  accessTokenExpireIn: number;
  refreshToken: string;
  memberId: number;
  hospitalId: number | null;
  hospitalName: string | null;
  temporarily: boolean;
  userRoleTypeName: ROLE_TYPE;
  name: string;
}

import { atom, atomFamily, selector, selectorFamily, waitForAll } from 'recoil';

/* ============ local Storage State ================= */

interface ILoginUserState {
  id: string;
  type: ROLE_TYPE | '';
  name: string;
}

export const loginUserStorageState = atom<ILoginUserState>({
  key: 'loginUserStorageState',
  default: {
    id: '',
    type: '',
    name: '',
  },
  effects_UNSTABLE: [
    ({ setSelf, onSet, trigger }) => {
      const userJson = localStorage.getItem('user');
      const parsing: IStorageData<'user'> = userJson ? JSON.parse(userJson) : null;
      const name = parsing ? parsing.name : '';
      const id = parsing ? parsing.id : '';
      const type = parsing ? parsing.type : '';
      setSelf({ id, type, name });
      onSet((newValue, _, isReset) => {
        if (!isReset) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...newValue,
            }),
          );
        } else {
          window.localStorage.clear();
        }
      });
    },
  ],
});

export const loginHospitalStorageState = atom({
  key: 'loginHospitalStorageState',
  default: {
    id: '',
    name: '',
  },
  effects_UNSTABLE: [
    ({ setSelf, onSet, trigger }) => {
      const userJson = localStorage.getItem('hospital');
      const parsing: IStorageData<'hospital'> = userJson ? JSON.parse(userJson) : null;
      const name = parsing ? parsing.name : '';
      const id = parsing ? parsing.id : '';
      setSelf({ id, name });

      onSet((newValue, _, isReset) => {
        if (!isReset) {
          localStorage.setItem(
            'hospital',
            JSON.stringify({
              ...newValue,
            }),
          );
        } else {
          window.localStorage.clear();
        }
      });
    },
  ],
});

export const getSigninState = selector({
  key: 'getSigninState',
  get: ({ get }) => {
    const userStorage = get(loginUserStorageState);
    return userStorage.id === '' ? 'N' : 'Y';
  },
});
