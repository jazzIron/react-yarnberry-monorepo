import {
  DiseaseListApiData,
  DiseaseAutoCompleteResult,
  diseaseListQuery,
  diseaseAutoCompleteResult,
} from '@src/store/disease/DiseaseState';
import { debounce, isEmpty } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil';

const isDiseaseAutoComplete = (
  res: DiseaseAutoCompleteResult,
): res is DiseaseAutoCompleteResult => {
  return (res as DiseaseAutoCompleteResult).error === false;
};

export function useDiseaseSearch(
  searchDisease: (keyword: string, type: string) => void,
  useOutsideClick: (
    ref: React.MutableRefObject<any>,
    handlerCallback: (event?: CustomEvent<MouseEvent>) => void,
  ) => void,
) {
  const outsideRef = useRef(null);
  const [searchInput, setSearchInput] = useState('');
  const [active, setActive] = useState<boolean>(false);
  const autoCompleteData = useRecoilValue(diseaseAutoCompleteResult);
  const resetDiseaseAutoCompleteResult = useResetRecoilState(diseaseAutoCompleteResult);

  const outsideCallback = () => resetDiseaseAutoCompleteResult();
  useOutsideClick(outsideRef, outsideCallback);

  const handleChangeInput = (inputValue: string) => {
    setSearchInput(inputValue);
    debouncedCallback(inputValue);
  };

  const debouncedCallback = useCallback(
    debounce((newValue: string) => searchDiseaseCallback(newValue), 500),
    [],
  );

  const inputFocusHandler = () => {
    resetDiseaseAutoCompleteResult();
    setActive(true);
  };
  const inputBlurHandler = () => setActive(false);
  const searchHandler = () => searchDisease(searchInput, 'SEARCH');

  const selectDiseaseItemHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    disease: DiseaseListApiData,
  ) => {
    event.preventDefault();
    setActive(false);
    searchDisease(disease.diseaseName, 'SEARCH');
  };

  const searchDiseaseCallback = useRecoilCallback(
    ({ snapshot, set }) =>
      async (newValue: string) => {
        try {
          if (isEmpty(newValue)) return false;
          resetDiseaseAutoCompleteResult();
          const refreshId = Math.random();
          const params = {
            searchParams: {
              searchKeyword: newValue,
              subjectId: '',
              currentPageNo: 1,
              limit: 10,
              mode: 'SEARCH',
            },
            refreshId,
          };
          const response: DiseaseAutoCompleteResult = await snapshot.getPromise(
            diseaseListQuery(params),
          );
          if (isDiseaseAutoComplete(response)) {
            set(diseaseAutoCompleteResult, {
              data: response.data,
              loading: false,
              error: response.error,
            });
          } else {
            throw new Error(`[ERROR] searchDiseaseCallback`);
          }
        } catch (error) {
          console.error(`[ERROR] searchDiseaseCallback: ${error}`);
        }
      },
  );

  return {
    searchInput,
    active,
    autoCompleteData,
    selectDiseaseItemHandler,
    handleChangeInput,
    inputFocusHandler,
    inputBlurHandler,
    searchHandler,
  };
}
