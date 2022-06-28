import {
  IRequestTreatmentData,
  IPongSocketRes,
  IChangeTreatmentStatusSocketRes,
  IRegisterPatientEmrNoRes,
  IRequestTreatmentSocketRes,
  IChangeTreatmentStatusSocketData,
  IRegisterPatientEmrNoData,
  IPongSocketData,
} from './WebSocket_type';

export const isRequestTreatmentRes = (
  res: IRequestTreatmentSocketRes,
): res is IRequestTreatmentData => {
  return (res as IRequestTreatmentData).status === 0;
};

export const isPongStatusSuccessRes = (res: IPongSocketRes): res is Required<IPongSocketData> => {
  return (res as IPongSocketData).status === 0;
};

export const isChangeTreatmentStatusSuccessRes = (
  res: IChangeTreatmentStatusSocketRes,
): res is Required<IChangeTreatmentStatusSocketData> => {
  return (res as IChangeTreatmentStatusSocketData).status === 0;
};

export const isRegisterPatientEmrNoRes = (
  res: IRegisterPatientEmrNoRes,
): res is Required<IRegisterPatientEmrNoData> => {
  return (res as IRegisterPatientEmrNoData).status === 0;
};

/*****************************************소켓 callbackEvent**********************************************/
