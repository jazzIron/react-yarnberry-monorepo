import {
  verifyBirth,
  verifyEmail,
  verifyNumber,
  verifyPassword,
  verifyRequired,
} from '@common/utils';
import { FORM_VALIDATE_TYPE, IValidate } from './Form_types';

export function validateCheck(type: FORM_VALIDATE_TYPE, value: unknown) {
  switch (type) {
    case FORM_VALIDATE_TYPE.EMAIL:
      return verifyEmail(String(value));

    case FORM_VALIDATE_TYPE.REQUIRED:
      return verifyRequired(String(value));

    case FORM_VALIDATE_TYPE.PWD:
      return verifyPassword(String(value));

    case FORM_VALIDATE_TYPE.NUMBER:
      return verifyNumber(String(value));

    case FORM_VALIDATE_TYPE.BIRTH:
      return verifyBirth(String(value));
    default:
      return false;
  }
}

export function formValidate(
  param: {
    type: FORM_VALIDATE_TYPE;
    name: string;
    sucMsg?: string;
    failMsg: string;
  }[],
): IValidate {
  let result: IValidate = {};
  param.forEach((el) => {
    const key = `${el.type}_${el.name}`;
    const success = el.sucMsg ? el.sucMsg : true;
    result = {
      ...result,
      [key]: (value) => {
        const tempValue = typeof value === 'object' ? value[el.name] : value;
        return validateCheck(el.type, tempValue) ? success : el.failMsg;
      },
    };
  });

  return result;
}
