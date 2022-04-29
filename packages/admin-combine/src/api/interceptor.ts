import axios from 'axios';
import { isNull } from 'lodash';

import axiosClient from './Instance';

let reqInterceptor: number | null = null;
let resInterceptor: number | null = null;

// build 환경에서 api path 재설정
const target = process.env.REACT_APP_ADMIN_URL;

console.log(target);

const pathRewriteFunc = (url: string) => {
  const rewrite: { [key: string]: string } = {
    api: target + '/api/v3/memberHospital',
    medicalRecordApi: target + '/api/v3/medicalRecord',
    memberApp: target + '/api/v3/memberApp',
  };

  const path = url.split('/')[1];
  return rewrite[path] ? url.replace(`/${path}`, rewrite[path]) : url;
};

export function apiInterceptors(event: 'resolve' | 'reject', callBack: (state: boolean) => void) {
  if (event === 'resolve') resolveInterceptor(callBack);
  if (event === 'reject') {
    if (!isNull(reqInterceptor)) axios.interceptors.request.eject(reqInterceptor);
    if (!isNull(resInterceptor)) axios.interceptors.response.eject(resInterceptor);
  }
}

function resolveInterceptor(callBack: (state: boolean) => void) {
  //header tocken 적용 제외 api
  reqInterceptor = axiosClient.interceptors.request.use(
    (config) => {
      const url = config.url ? config.url : '';

      // const pathRewrite = process.env.REACT_APP_MODE === 'PRODUCTION' ? pathRewriteFunc(url) : url;
      const pathRewrite = pathRewriteFunc(url);

      const token = localStorage.getItem('token');
      config = {
        ...config,
        url: pathRewrite,
        headers: {
          ...config.headers,
          // 'Access-Control-Allow-Origin': target,

          ...(token ? { Authorization: token } : {}),
        },
      };

      console.log('============= request config =============\n', config);

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  let isTokenRefreshing = false;
  resInterceptor = axiosClient.interceptors.response.use(
    (response) => {
      callBack(false);
      return response;
    },
    async (error) => {
      console.log(
        '=========== http response interceptors error ===========\n',
        error,
        '\n',
        error.response,
      );
      const { config, response } = error;

      if (response) {
        if (response.status === 400 && response.data.status === 214) {
          //토큰 만료

          const refreshToken = localStorage.getItem('refreshToken');
          if (!isTokenRefreshing && refreshToken) {
            isTokenRefreshing = true;
            const getQuery = await axios.post('/api/hospital/accounts/tokenRefresh', {
              refreshToken: refreshToken,
            });

            console.log('============= token refresh ====================\n', getQuery);
            const { status, data, message, failure } = getQuery.data;
            if (failure) {
              localStorage.setItem('token', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);

              isTokenRefreshing = false;

              // // 실패했던 요청 새로운 accessToken으로 재요청
              return await axiosClient({
                ...config,
                headers: {
                  ...config.header,
                  Authorization: data.accessToken,
                },
              });
            }
          }
        }
      }

      callBack(true);
      return Promise.reject(error);
    },
  );
}
