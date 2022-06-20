import {
  diseaseListSearchParams,
  DiseaseListQuery,
  diseaseListQuery,
  diseaseListResult,
  DiseaseListQueryResult,
  diseaseListPageState,
} from '@src/store/disease/DiseaseState';
import { useRecoilValue, useRecoilCallback } from 'recoil';

const isDiseaseListQuery = (res: DiseaseListQueryResult): res is DiseaseListQueryResult => {
  return (res as DiseaseListQueryResult).error === false;
};

export function useDiseaseList() {
  const diseaseList = useRecoilValue(diseaseListResult);
  const searchParams = useRecoilValue(diseaseListSearchParams);

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

  return {
    diseaseList,
    getDiseaseList,
  };
}
