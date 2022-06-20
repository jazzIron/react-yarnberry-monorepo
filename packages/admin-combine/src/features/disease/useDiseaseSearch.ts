import {
  diseaseListPageState,
  diseaseListSearchParams,
  Paging,
} from '@src/store/disease/DiseaseState';
import { useMemo } from 'react';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';

export function useDiseaseSearch() {
  const [diseaseListPage, setDiseaseListPage] = useRecoilState(diseaseListPageState);
  const [searchParams, setSearchParams] = useRecoilState(diseaseListSearchParams);
  const resetDiseaseListSearchParams = useResetRecoilState(diseaseListSearchParams);

  const hasNextPage = useMemo(() => {
    const { criteria, endPage } = diseaseListPage;
    if (endPage === 0) return true;
    return criteria.currentPageNo < endPage && criteria.currentPageNo !== endPage ? true : false;
  }, [diseaseListPage]);

  const changeKeywordHandler = (value: string) => {
    return setSearchParams((prev) => ({
      ...prev,
      searchKeyword: value,
      mode: 'CHANGE_PARAM',
    }));
  };

  const changeSubjectHandler = (value: string) => {
    return setSearchParams((prev) => ({
      ...prev,
      subjectId: value,
      mode: 'CHANGE_PARAM',
    }));
  };

  const changePageHandler = () => {
    console.log(diseaseListPage);
    if (!hasNextPage) return false;
    setSearchParams((prev) => {
      const currentPageNo = hasNextPage ? prev.currentPageNo + 1 : prev.currentPageNo;
      return {
        ...prev,
        currentPageNo: currentPageNo,
        // limit: 800,
        mode: 'SEARCH',
      };
    });
  };

  const changeDiseaseListPageStateHandler = (paging: Paging) => {
    setDiseaseListPage(paging);
  };

  return {
    searchParams,
    diseaseListPage,
    hasNextPage,
    resetDiseaseListSearchParams,
    changeKeywordHandler,
    changeSubjectHandler,
    changePageHandler,
    changeDiseaseListPageStateHandler,
  };
}
