import { IListPagination } from '@common/utils';
import { atom, atomFamily } from 'recoil';
import { getDiseaseList } from './../../api/disease/DiseaseApi';

type SelectorMapper<Type> = {
  [Property in keyof Type]: Type[Property];
};
type SEARCH_MODE = 'SEARCH' | 'CHANGE_PARAM';

export type DiseaseSearch = DiseaseSearchParams & { mode: SEARCH_MODE };

export interface DiseaseSearchParams {
  [key: string]: string | number | undefined | boolean;
  searchKeyword: string;
  subjectId: string;
  currentPageNo: number;
  limit: number;
  mode: string;
}

export const diseaseListSearchParams = atom<DiseaseSearchParams>({
  key: 'diseaseListSearchParams',
  default: {
    mode: 'SEARCH',
    searchKeyword: '',
    subjectId: '',
    currentPageNo: 1,
    limit: 10,
    total: 0,
    next: false,
  },
});

export interface DiseaseListApi {
  diseaseId: string;
  diseaseName: string;
  diseasePartName: string;
  diseaseDefinition: string;
}

export interface Paging {
  criteria: { currentPageNo: number; limit: number; offset: number };
  endPage: number;
  next: boolean;
  prev: boolean;
  startPage: number;
  total: number;
}

export interface DiseaseListQuery {
  data: DiseaseListApi[] | [];
  paging: Paging;
  //   pageNumber: number;
  searchParams: DiseaseSearchParams;
  code: number;
  message: string | null;
  loading: boolean;
  error: boolean;
}

interface DiseaseListQueryParams {
  searchParams: DiseaseSearchParams;
  refreshId: number;
}

export const diseaseListQuery = atomFamily<
  DiseaseListQuery,
  SelectorMapper<DiseaseListQueryParams>
>({
  key: 'diseaseListQuery',
  default: async ({ searchParams, refreshId }) => {
    const diseaseList: DiseaseListQuery = await getDiseaseList(searchParams);
    const error = diseaseList.code === 200 ? false : true;
    return {
      data: diseaseList.data,
      paging: diseaseList.paging,
      searchParams: searchParams,
      message: diseaseList.message,
      code: diseaseList.code,
      error,
      loading: true,
    };
  },
});

export interface DiseaseListQueryResult
  extends Omit<DiseaseListQuery, 'searchParams' | 'message' | 'code'> {
  loading: boolean;
  error: boolean;
}

export const diseaseListResult = atom<DiseaseListQueryResult>({
  key: 'diseaseListResult',
  default: {
    data: [],
    loading: true,
    paging: {
      criteria: { currentPageNo: 1, limit: 20, offset: 0 },
      endPage: 0,
      next: false,
      prev: false,
      startPage: 1,
      total: 0,
    },
    error: true,
  },
});

export const diseaseListPageState = atom<Paging>({
  key: 'diseaseListPageState',
  default: {
    criteria: { currentPageNo: 1, limit: 20, offset: 0 },
    endPage: 0,
    next: false,
    prev: false,
    startPage: 1,
    total: 0,
  },
});
