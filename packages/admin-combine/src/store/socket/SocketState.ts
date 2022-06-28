import { SOCKET_CONNECT_STATUS, SOCKET_RESPONSE_MSG } from '@src/hooks/webSocket';
import { atom } from 'recoil';

export interface ISocketResponse {
  status: number;
  message: string;
  data?: unknown;
  type: SOCKET_RESPONSE_MSG | '';
}

export const treatSocketState = atom<ISocketResponse>({
  key: 'treatSocketState',
  default: {
    status: 500,
    message: '',
    data: {},
    type: '',
  },
});
