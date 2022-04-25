import { isEmpty, uniq } from 'lodash';

/**
 * 유효성 검사

/** 이메일 유효성 체크
 * id(. _ - 허용) @ domain.com
 */
export const verifyEmail = (value: string) => {
  const regExp =
    /^([\w.-])*[a-zA-Z0-9]+([\w.-])*([a-zA-Z0-9])+([\w.-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,4}$/i;
  return regExp.test(value);
};

/** 비밀번호 유효성 체크
 * 비밀번호 8 ~ 16자리 (영문+숫자+특수문자 포함)
 */
export const verifyPassword = (value: string) => {
  const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
  return regExp.test(value);
};

/** 비밀번호 일치 확인
 */
export const verifyPasswordAgree = (...args: Array<string | number>): boolean => {
  return uniq(args).length === 1 ? true : false;
};

/** 전화번호 유효성 체크
 * ex (111-111-1111, 111-1111-1111)
 */
export const verifyPhone = (value: string) => {
  const regExp = /(\d{3}).*(\d{3}).*(\d{4})/;
  return regExp.test(value);
};

/**
 * 유저 이름 유효성 체크 ( 한글 + 영문 )
 */
export const verifyName = (value: string) => {
  const regExp = /^[가-힣a-zA-Z]+$/;
  return regExp.test(value);
};

/**
 * 숫자 유효성 체크 ( 숫자 )
 */
export const verifyNumber = (value: string) => {
  const regExp = /^[0-9]/g;
  return regExp.test(value);
};

/**
 * 우편번호 체크 (숫자만 5자리)
 */
export const verifyPostCode = (value: string) => {
  const regExp = /\d{5}/;
  return regExp.test(value);
};

/**
 * 인증번호 체크 (소문자 / 대문자 /숫자)
 */
export const verifyAuthCode = (value: string) => {
  const regExp = /^[a-z0-9]{8}$/;
  return regExp.test(value);
};

/**
 * 주민등록번호 앞자리 체크
 *
 * 전체 주민등록번호 체크 /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/
 */

export const verifySocialNumber = (value: string) => {
  const regExp = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
  return regExp.test(value);
};

/**
 * 생년월일 체크
 *
 * YYYYMMDD
 */

export const verifyBirth = (value: string) => {
  const regExp = /^((?:19|20)(?:[0-9]{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
  return regExp.test(value);
};

export const verifyRequired = (value: string) => {
  return !isEmpty(value);
};
