// https://maruzzing.github.io/study/rnative/axios-interceptors%EB%A1%9C-%ED%86%A0%ED%81%B0-%EB%A6%AC%ED%94%84%EB%A0%88%EC%8B%9C-%ED%95%98%EA%B8%B0/

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
const MockAdapter = require('axios-mock-adapter');
import { mock, mockFail } from './Mock';
const { REACT_APP_MODE } = process.env;

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

export default axiosClient;

/* ========================================================== */

export async function api(apiConfig: AxiosRequestConfig) {
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
