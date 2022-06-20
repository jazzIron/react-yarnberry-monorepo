import { AxiosRequestConfig } from 'axios';
import { DISEASE } from '../constant';
import { api } from '../Instance';

//areyousick.kr:3443/open/api/diseases?languageType=ko&searchKeyword=&subjectId=&currentPageNo=1&limit=20

//병원 목록 검색
export const getDiseaseList = async (params: {
  searchKeyword: string;
  subjectId: string;
  currentPageNo: number;
  limit: number;
}) => {
  const apiConfig: AxiosRequestConfig = {
    url: DISEASE.DISEASES.DISEASE_LIST,
    method: 'GET',
    params: {
      languageType: 'ko',
      searchKeyword: params.searchKeyword,
      subjectId: params.subjectId,
      currentPageNo: params.currentPageNo,
      limit: params.limit,
    },
  };
  return api(apiConfig);
};
