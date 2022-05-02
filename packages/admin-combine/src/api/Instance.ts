// https://maruzzing.github.io/study/rnative/axios-interceptors%EB%A1%9C-%ED%86%A0%ED%81%B0-%EB%A6%AC%ED%94%84%EB%A0%88%EC%8B%9C-%ED%95%98%EA%B8%B0/

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
const MockAdapter = require('axios-mock-adapter');
import { mock, mockFail } from './Mock';
//const { REACT_APP_MODE, REACT_APP_ADMIN_URL } = process.env;

const config: AxiosRequestConfig = {
  baseURL: '',
};

const axiosClient: AxiosInstance = axios.create(config);
axiosClient.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axiosClient.defaults.timeout = 5000; // 2.5 timeout 설정

// if (REACT_APP_MODE === 'DEVELOPMENT') {
//   const mockAdapter = new MockAdapter(axiosClient, { delayResponse: 2000 });

//   Object.values(mock).forEach((mockData) => {
//     mockAdapter.onGet(mockData.url, { params: mockData.params }).reply(200, {
//       ...mockData.results,
//     });
//   });

//   Object.values(mockFail).forEach((mockData) => {
//     mockAdapter.onGet(mockData.url, { params: mockData.params }).reply(200, {
//       ...mockData.results,
//     });
//   });
// }

// const target = process.env.REACT_APP_ADMIN_URL;
const target = process.env.API_URL;

const pathRewriteFunc = (url: string) => {
  const rewrite: { [key: string]: string } = {
    api: target + '/api/v3/memberHospital',
    medicalRecordApi: target + '/api/v3/medicalRecord',
    memberApp: target + '/api/v3/memberApp',
  };

  const path = url.split('/')[1];
  return rewrite[path] ? url.replace(`/${path}`, rewrite[path]) : url;
};

//header tocken 적용 제외 api
axiosClient.interceptors.request.use(
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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isTokenRefreshing = false;
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('=========== http response interceptors error ===========\n', error.response);
    const { config, response } = error;
    if (response) {
      if (response.status === 400 && response.data.status === 214) {
        //토큰 만료

        if (!isTokenRefreshing) {
          isTokenRefreshing = true;
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            const getQuery = await axios.post('/api/hospital/accounts/tokenRefresh', {
              refreshToken: JSON.parse(refreshToken),
            });

            console.log('============= token refresh ====================\n', getQuery);

            const { status, data, message } = getQuery.data;
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            isTokenRefreshing = false;

            // // 실패했던 요청 새로운 accessToken으로 재요청
            return await axios({
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

    return Promise.reject(error);
  },
);

export default axiosClient;

/* ========================================================== */

export async function api(apiConfig: AxiosRequestConfig) {
  console.log('=================api==========================');

  return await axiosClient(apiConfig)
    .then((response) => {
      console.log('=========== upload response ==========\n', response);
      if (response.data) {
        if (response.status === 200) {
          if (response.data.status !== 0) {
            // Sentry.captureException(
            //   `response Error : ${response.data.status} '/'${response.data.message} `,
            // );
          }

          return response.data;
        }

        if (response.data !== 200 && response.data.message === null) {
          //그 외 에러
          throw new Error();
        }
      }
    })
    .catch((error) => {
      // Sentry.captureException(`Catched Error : ${error}`);
      console.warn(`getDoctorPosition REST API Error ===> ${error.toJSON()}`);
      return {
        status: error.response && error.response.status !== 0 ? error.response.status : 9999,
        data: null,
        message: null,
      };
    });
}
