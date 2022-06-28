import styled from '@emotion/styled';
import { HAS_TREAT_STATUS } from '@src/@types/Treat_types';
import { SOCKET_CONNECT_STATUS } from '@src/hooks/webSocket';
import useWebSocket from '@src/hooks/webSocket/useWebSocket';
import { useEffect, useMemo, useRef, useState } from 'react';
import useInterval from './useInterval';
import moment from 'moment';
import { throttle } from 'lodash';
import { getTimeStamp } from '@common/utils';

interface ISocketData {
  type: string;
  time: string;
  messageType: string;
  connectStatus: SOCKET_CONNECT_STATUS;
  responseMessage: string;
}

export function SocketPage() {
  const [socketData, setSocketData] = useState<ISocketData[]>([]);
  const messageBoxRef = useRef<HTMLDivElement>(null);

  const throttledScroll = useMemo(
    () =>
      throttle(() => {
        if (!messageBoxRef.current) return;
        const scroll = messageBoxRef.current.scrollHeight - messageBoxRef.current.clientHeight;
        messageBoxRef.current.scrollTo(0, scroll);
      }, 200),
    [],
  );

  useEffect(() => {
    throttledScroll();
  }, [socketData]);

  useEffect(() => {
    connectSocket();
    return () => {
      closeSocket();
    };
  }, []);

  const handleSocketConnectStateChanged = async (
    state: SOCKET_CONNECT_STATUS,
    parsedMessage: any,
  ) => {
    if (state === 'OPEN') {
      const doctorTreatStatus = 'ON';
      treatStatusRequest(doctorTreatStatus);
      makeDataItem('EVENT', state, 'OPEN', ``);
      return false;
    }
    if (state === 'CLOSED') {
      const message = `[SOCKET_LOG] socket Close type: ${state}, parseMessage:${JSON.parse(
        parsedMessage,
      )}`;
      makeDataItem('EVENT', state, 'MESSAGE', message);
      return false;
    }
    if (state === 'MESSAGE') {
      const messageType = parsedMessage.type;
      const sessionId = parsedMessage.sessionId;
      makeDataItem('EVENT', state, messageType, sessionId);
      return false;
    }
  };

  const { heartBeatTimer, connectSocket, closeSocket, sendSocketMessage, clearIntervalHandler } =
    useWebSocket(handleSocketConnectStateChanged);

  const treatStatusRequest = async (doctorTreatStatus: HAS_TREAT_STATUS) => {
    const doctorId = 41;
    const registerDoctorParam = {
      type: 'REGISTER_DOCTOR',
      doctorId: Number(doctorId),
    };
    const changeTreatmentStatusParam = {
      type: 'CHANGE_TREATMENT_STATUS',
      doctorId: Number(doctorId),
      doctorTreatmentStatus: doctorTreatStatus,
    };
    const [registerDoctor, changeTreatmentStatus]: [
      registerDoctor: unknown,
      changeTreatmentStatus: unknown,
    ] = await Promise.all([
      sendSocketMessage(registerDoctorParam),
      sendSocketMessage(changeTreatmentStatusParam),
    ]);
  };

  useInterval(() => {
    console.log('=====================useInterval=====================');

    console.group('[SOCKET_LOG] sendSocketMessage PING START================');
    console.log(getTimeStamp());
    console.groupEnd();

    sendSocketMessage({
      type: 'PING',
    });

    makeDataItem('INTERVAL', 'MESSAGE', 'PING', ``);
  }, heartBeatTimer);

  const makeDataItem = (
    type: string,
    connectStatus: SOCKET_CONNECT_STATUS,
    messageType: string,
    message: string,
  ) => {
    const today = new Date();
    const time = moment(today, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
    const newMsg = {
      type: type,
      messageType: messageType,
      time: time,
      connectStatus: connectStatus,
      responseMessage: message,
    };
    setSocketData((prev) => [...prev, newMsg]);
  };

  return (
    <SocketPageWrapper ref={messageBoxRef}>
      <SocketContentWrapper>
        {socketData &&
          socketData.map((data, idx) => {
            return (
              <SocketItemStyled key={idx}>
                <div>{data.time}</div>
                <div>{data.type}</div>
                <div>[{data.messageType}]</div>
                {/* <div>{data.connectStatus}</div> */}
                <div>{data.responseMessage}</div>
              </SocketItemStyled>
            );
          })}
      </SocketContentWrapper>
    </SocketPageWrapper>
  );
}

const SocketPageWrapper = styled.div`
  width: 100%;
  height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const SocketContentWrapper = styled.div`
  padding: 0px 8px;
`;

const SocketItemStyled = styled.div`
  display: flex;
  gap: 8px;
  border: 1px solid #616161;
  padding: 8px;
  border-radius: 5px;
  margin: 8px 0px;

  > div:nth-of-type(2) {
    color: #9e9e9e;
    min-width: 72px;
  }
  > div:nth-of-type(3) {
    color: red;
    min-width: 72px;
    font-weight: bold;
  }
`;
