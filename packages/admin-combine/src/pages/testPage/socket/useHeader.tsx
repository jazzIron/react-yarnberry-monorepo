import { ToastHook, TOAST_TYPE, TOAST_OPTION_POSITION } from '@common/components';
import { getTimeStamp } from '@common/utils';
import { HAS_TREAT_STATUS } from '@src/@types/Treat_types';
import { IStorageData } from '@src/hooks/localStorage';
import {
  IRequestTreatmentSocketRes,
  IChangeTreatmentStatusSocketRes,
  IRegisterPatientEmrNoRes,
  ISocketResponse,
  INotConnectedRes,
  SOCKET_CONNECT_STATUS,
  IRegisterPatientEmrNoData,
  IRequestTreatmentData,
} from '@src/hooks/webSocket';
import {
  isRequestTreatmentRes,
  isChangeTreatmentStatusSuccessRes,
  isRegisterPatientEmrNoRes,
} from '@src/hooks/webSocket/socketUtils';
import { treatSocketState } from '@src/store/socket/SocketState';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export const getDoctorId = () => {
  const userJson = localStorage.getItem('user');
  const parsingDoctorId: IStorageData<'user'> = userJson ? JSON.parse(userJson) : null;
  return parsingDoctorId ? parsingDoctorId.id : '';
};

export default function useHeader(
  treatStatusRequest: (doctorTreatStatus: HAS_TREAT_STATUS) => void,
) {
  const { toastMake } = ToastHook();
  const [treatSocket, setTreatSocket] = useRecoilState(treatSocketState);
  const [socketState, setSocketState] = useState<SOCKET_CONNECT_STATUS>('WAIT');

  const setToastHandler = (parsedMessage: IRegisterPatientEmrNoData) => {
    const msg = '비대면환자 정보가 EMR에 등록되었습니다.';
    if (!isEmpty(msg)) {
      toastMake({
        content: msg,
        type: TOAST_TYPE.INFO,
        options: {
          autoClose: true,
          position: TOAST_OPTION_POSITION.TOP_CENTER,
          onOpen: () => {
            setTreatSocket({
              status: parsedMessage.status,
              message: parsedMessage.message,
              data: parsedMessage.emrNo,
              type: parsedMessage.type,
            });
          },
        },
      });
    }
  };

  const onChangeTreatmentStatusCallback = async (
    parsedMessage: IChangeTreatmentStatusSocketRes,
  ) => {
    if (isChangeTreatmentStatusSuccessRes(parsedMessage)) return false;
    setTreatSocket({
      status: parsedMessage.status,
      message: parsedMessage.message,
      type: parsedMessage.type,
    });
  };

  const onRegisterPatientEmrNoCallback = async (parsedMessage: IRegisterPatientEmrNoRes) => {
    if (isRegisterPatientEmrNoRes(parsedMessage)) {
      setTreatSocket({
        status: parsedMessage.status,
        message: parsedMessage.message,
        type: parsedMessage.type,
      });
      setToastHandler(parsedMessage);
      return true;
    }
  };

  const onCanceledTreatmentByMemberCallback = async (parsedMessage: ISocketResponse) => {
    setTreatSocketCallback(parsedMessage);
  };
  const onFinishedTreatmentByMemberCallback = async (parsedMessage: ISocketResponse) => {
    setTreatSocketCallback(parsedMessage);
  };
  const onNotConnectedCallback = async (parsedMessage: INotConnectedRes) => {
    setTreatSocketCallback(parsedMessage);
  };
  const onDuplicateConnectCallback = async (parsedMessage: INotConnectedRes) => {
    setTreatSocketCallback(parsedMessage);
  };

  const setTreatSocketCallback = (parsedMessage: any) => {
    setTreatSocket({
      status: parsedMessage.status,
      message: parsedMessage.message,
      type: parsedMessage.type,
    });
  };

  //TODO: parsedMessage 타입가드 생성필요
  const socketMessageCallback = (parsedMessage: any) => {
    const messageType = parsedMessage.type;
    switch (messageType) {
      case 'REQUEST_TREATMENT':
        return console.log(
          '[SOCKET_LOG] socketMessageCallback type: REQUEST_TREATMENT, parseMessage:',
          parsedMessage,
        );
      case 'CHANGE_TREATMENT_STATUS':
        return onChangeTreatmentStatusCallback(parsedMessage);
      case 'REGISTER_PATIENT_EMR_NO':
        return onRegisterPatientEmrNoCallback(parsedMessage);
      case 'CANCELED_TREATMENT_BY_MEMBER':
        return onCanceledTreatmentByMemberCallback(parsedMessage);
      case 'FINISHED_TREATMENT_BY_MEMBER':
        return onFinishedTreatmentByMemberCallback(parsedMessage);
      case 'NOT_CONNECTED':
        return onNotConnectedCallback(parsedMessage);
      case 'DUPLICATE_CONNECT':
        return onDuplicateConnectCallback(parsedMessage);
      case 'PONG':
        console.group('[SOCKET_LOG] socketMessageCallback PONG START================');
        console.log(parsedMessage);
        console.log(getTimeStamp());
        console.groupEnd();
        return false;
      default:
        break;
    }
  };

  const handleSocketConnectStateChanged = async (
    state: SOCKET_CONNECT_STATUS,
    parsedMessage: any,
  ) => {
    if (state === 'OPEN') {
      const doctorTreatStatus = 'ON';
      treatStatusRequest(doctorTreatStatus);
      return false;
    }
    if (state === 'CLOSED') {
      setSocketState(state);
      return false;
    }

    if (state === 'MESSAGE') {
      socketMessageCallback(parsedMessage);
      return false;
    }
  };

  return { treatSocket, socketState, handleSocketConnectStateChanged };
}
