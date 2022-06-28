import { getTimeStamp } from '@common/utils';
import { treatSocketState } from '@src/store/socket/SocketState';
import { useRef, useState } from 'react';
import { useResetRecoilState } from 'recoil';

import { SOCKET_CONNECT_STATUS } from './WebSocket_type';

const SOCKET_DOMAIN = 'wss://sapi-hospital.whatailsyou.app/api/v3/medicalRecord/hospital/ws';
//const SOCKET_DOMAIN = 'ws://192.168.1.7:8091/hospital/ws';

export default function useWebSocket(
  onSocketConnectStateChanged: (state: SOCKET_CONNECT_STATUS, parsedMessage: any) => void,
) {
  const socketRef = useRef<WebSocket | null>(null);
  const HEART_BEAT_TIMER = 15000;
  const [heartBeatTimer, setHeartBeatTimer] = useState<number>(0);
  const resetTreatSocket = useResetRecoilState(treatSocketState);

  const connectSocket = async () => {
    socketRef.current = new WebSocket(SOCKET_DOMAIN!);
    socketRef.current.onopen = async (event) => {
      console.group('[SOCKET_LOG] socket new connect open');
      console.log(event);
      console.groupEnd();
      setHeartBeatTimer(HEART_BEAT_TIMER);
      onSocketConnectStateChanged('OPEN', '');
    };

    socketRef.current.onerror = async (event) => {
      console.group('[SOCKET_LOG] socket onerror');
      console.error(event);
      console.groupEnd();
      setHeartBeatTimer(0);
      socketRef.current = null;
      onSocketConnectStateChanged('ERROR', '');
    };

    socketRef.current.onclose = async (event) => {
      console.group('[SOCKET_LOG] socket onclose');
      console.error(event);
      console.error(event.code);
      console.groupEnd();
      setHeartBeatTimer(0);
      socketRef.current = null;
      const parsedMessage = {
        error: true,
        code: event.code,
      };
      onSocketConnectStateChanged('CLOSED', parsedMessage);
    };

    socketRef.current.onmessage = async (event) => {
      event.preventDefault();
      const parsedMessage = JSON.parse(event.data);
      onSocketConnectStateChanged('MESSAGE', parsedMessage);
    };
  };

  const closeSocket = () => {
    console.log('closeSocket');
    if (!socketRef.current) return false;
    socketRef.current.close();
    socketRef.current = null;
    setHeartBeatTimer(0);
    resetTreatSocket();
  };

  const sendSocketMessage = async (message: unknown) => {
    const jsonMessage = JSON.stringify(message);
    if (!socketRef.current) return false;
    socketRef.current.send(jsonMessage);
    console.group('[SOCKET_LOG] sendSocketMessage SEND START================');
    console.log(jsonMessage);
    console.log(getTimeStamp());
    console.groupEnd();
  };

  const clearIntervalHandler = () => {
    setHeartBeatTimer(0);
  };

  return {
    heartBeatTimer,
    connectSocket,
    closeSocket,
    sendSocketMessage,
    clearIntervalHandler,
  };
}
