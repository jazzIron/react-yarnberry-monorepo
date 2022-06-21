import {
  diseaseListSearchParams,
  DiseaseListQuery,
  diseaseListQuery,
  diseaseListResult,
  DiseaseListQueryResult,
  diseaseListPageState,
  Paging,
} from '@src/store/disease/DiseaseState';
import { useMemo, useCallback } from 'react';
import { useRecoilValue, useRecoilCallback, useResetRecoilState, useRecoilState } from 'recoil';

const isDiseaseListQuery = (res: DiseaseListQueryResult): res is DiseaseListQueryResult => {
  return (res as DiseaseListQueryResult).error === false;
};

export function useDiseaseList() {
  const diseaseList = useRecoilValue(diseaseListResult);
  const resetDiseaseListResult = useResetRecoilState(diseaseListResult);
  const [diseaseListPage, setDiseaseListPage] = useRecoilState(diseaseListPageState);
  const [searchParams, setSearchParams] = useRecoilState(diseaseListSearchParams);
  const resetDiseaseListSearchParams = useResetRecoilState(diseaseListSearchParams);

  const getDiseaseList = useRecoilCallback(({ snapshot, set }) => async () => {
    try {
      const refreshId = Math.random();
      const params = {
        searchParams,
        refreshId,
      };
      const response: DiseaseListQuery = await snapshot.getPromise(diseaseListQuery(params));

      if (isDiseaseListQuery(response)) {
        set(diseaseListResult, {
          data: response.data,
          loading: false,
          paging: response.paging,
          error: response.error,
        });
      } else {
        throw new Error(`[ERROR] DiseaseListResult`);
      }
    } catch (error) {
      console.error(`[ERROR] DiseaseListResult: ${error}`);
    }
  });

  const hasNextPage = useMemo(() => {
    const { criteria, endPage } = diseaseListPage;
    if (endPage === 0) return true;
    return criteria.currentPageNo < endPage && criteria.currentPageNo !== endPage ? true : false;
  }, [diseaseListPage]);

  const changeKeywordHandler = useCallback((value: string, type: string) => {
    return setSearchParams((prev) => ({
      ...prev,
      searchKeyword: value,
      currentPageNo: 1,
      mode: type,
    }));
  }, []);

  const changeSubjectHandler = useCallback((value: string) => {
    return setSearchParams((prev) => ({
      ...prev,
      subjectId: value,
      mode: 'CHANGE_PARAM',
    }));
  }, []);

  const changePageHandler = useCallback(() => {
    if (!hasNextPage) return false;
    setSearchParams((prev) => {
      const currentPageNo = hasNextPage ? prev.currentPageNo + 1 : prev.currentPageNo;
      return {
        ...prev,
        currentPageNo: currentPageNo,
        mode: 'NEXT_PAGE',
      };
    });
  }, []);

  const changeDiseaseListPageStateHandler = useCallback((paging: Paging) => {
    setDiseaseListPage(paging);
  }, []);

  return {
    diseaseList,
    searchParams,
    diseaseListPage,
    hasNextPage,
    getDiseaseList,
    resetDiseaseListResult,
    resetDiseaseListSearchParams,
    changeKeywordHandler,
    changeSubjectHandler,
    changePageHandler,
    changeDiseaseListPageStateHandler,
  };
}
