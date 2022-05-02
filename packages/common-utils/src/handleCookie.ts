//===============================cookie===================================

export const cookieKey = 'adap_id';

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookieName = cookies[i].slice(0, cookies[i].indexOf('=')).trim();
    const cookieValue = cookies[i].slice(cookies[i].indexOf('=') + 1);

    if (cookieName === name) return cookieValue;
  }
};

export const setCookie = (key: string, value: string) => {
  const exDate = new Date();
  //쿠키 만료일 30일
  exDate.setDate(exDate.getDate() + 30);

  const cookieValue = value + '; expires=' + exDate.toUTCString();
  document.cookie = key + '=' + cookieValue;
};

export const setCookieSecure = (key: string, value: string) => {
  const cookieValue = value + ';secure';
  document.cookie = key + '=' + cookieValue;
};

export const removeCookie = (key: string) => {
  const exDate = new Date();
  exDate.setDate(exDate.getDate() - 1);

  const value = ' ; expires=' + exDate.toUTCString();
  document.cookie = key + '=' + value;
};
