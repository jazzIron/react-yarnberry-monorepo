import { SEX_TYPE } from '@common/utils';
import { HAS_TREAT_STATUS } from '@src/@types/Treat_types';

export type RequestTreatment = Readonly<IRequestTreatmentData>;
export type SOCKET_CONNECT_STATUS = 'WAIT' | 'OPEN' | 'CLOSED' | 'ERROR' | 'MESSAGE';
export type SOCKET_CONNECT_MODE = 'INIT' | 'TOGGLE' | 'ERROR';
export type SOCKET_REQUEST_MSG = 'REGISTER_DOCTOR' | 'CHANGE_TREATMENT_STATUS' | 'PING';
export type SOCKET_RESPONSE_MSG =
  | 'REQUEST_TREATMENT' // 진료 요청
  | 'REGISTER_PATIENT_EMR_NO' // 환자코드를 등록한경우
  | 'CHANGE_TREATMENT_STATUS' // 의료진 상태를 변경한경우
  | 'CANCELED_TREATMENT_BY_MEMBER' // 환자가 진료를 취소한 경우
  | 'FINISHED_TREATMENT_BY_MEMBER' // 환자가 진료를 종료한 경우
  | 'PONG' // HeartBeat
  | 'NOT_CONNECTED' // 연결 오류
  | 'DUPLICATE_CONNECT'; // 다른 세션에서 접속

interface ISocketResponseCode {
  [key: string]: {
    status: number;
    message: string;
  };
}

export const SOCKET_RESPONSE: ISocketResponseCode = {
  OK: {
    status: 0,
    message: '요청 성공',
  },
  BAD_REQUEST: {
    status: 400,
    message: '유효하지 않은 요청 데이터',
  },
  SERVER_ERROR: {
    status: 500,
    message: '서버 에러',
  },
  DUPLICATE_CONNECT: {
    status: 504,
    message: '다른 세션에서 중복 접속',
  },
  NOT_CONNECTED: {
    status: 505,
    message: '의사 ID와 연결되지 않은 세션',
  },
};

export interface ISocketResponse {
  status: number;
  message: string;
  type: SOCKET_RESPONSE_MSG;
}

export type IRequestTreatmentSocketRes = Readonly<IRequestTreatmentData> | ISocketResponse;
export interface IRequestTreatmentData extends ISocketResponse {
  medicalDepartmentId: number;
  memberId: number;
  memberName: string;
  memberSexTypeName: SEX_TYPE;
  memberSexTypeLabel: string;
  treatmentId: number;
  uid: string;
  memberBirthDate: string;
}

export type IChangeTreatmentStatusSocketRes =
  | Readonly<IChangeTreatmentStatusSocketData>
  | ISocketResponse;
export interface IChangeTreatmentStatusSocketData extends ISocketResponse {
  doctorTreatmentStatusLabel?: string;
  doctorTreatmentStatusName?: HAS_TREAT_STATUS;
}

export type IPongSocketRes = Readonly<IPongSocketData> | ISocketResponse;
export interface IPongSocketData extends ISocketResponse {
  sessionId?: string;
  doctorId?: number;
}

export type INotConnectedRes = Readonly<INotConnectedData> | ISocketResponse;
export interface INotConnectedData extends ISocketResponse {
  doctorId?: number;
  sessionId?: string;
}

export type IRegisterPatientEmrNoRes = Readonly<IRegisterPatientEmrNoData> | ISocketResponse;
export interface IRegisterPatientEmrNoData extends ISocketResponse {
  emrNo: string;
}

export type IDuplicateConnectRes = Readonly<IDuplicateConnectData> | ISocketResponse;
export interface IDuplicateConnectData extends ISocketResponse {
  doctorId?: number;
  sessionId?: string;
}
