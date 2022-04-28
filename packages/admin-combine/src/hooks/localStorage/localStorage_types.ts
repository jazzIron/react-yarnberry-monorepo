import { ROLE_TYPE } from '@src/@types/Global_types';

type StorageType = 'user' | 'hospital' | 'token' | 'refreshToken';

export type IStorageData<T extends StorageType> =
  | (T extends 'user' ? IStorageUser : null)
  | (T extends 'hospital' ? IStorageHospital : null)
  | (T extends 'token' ? string : null)
  | (T extends 'refreshToken' ? string : null)
  | null;

interface IStorageUser {
  id: string;
  type: ROLE_TYPE;
  name: string;
}

interface IStorageHospital {
  id: string;
  name: string;
}
