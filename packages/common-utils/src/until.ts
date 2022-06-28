import moment from 'moment';

/**
 * 클립보드 복사
 */
export const doCopy = (name: string) => {
  const textField = document.createElement('textarea');
  textField.innerText = name;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};

export const regExpReplaceAll = (str: string, type: string) => {
  return str.replace(`/${type}/gi`, '');
};

// object key checker
export const isKeyExists = (obj: any, key: string) => {
  return obj[key] === undefined ? false : true;
};

export const getTimeStamp = () => {
  const today = new Date();
  const time = moment(today, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
  return time;
};
