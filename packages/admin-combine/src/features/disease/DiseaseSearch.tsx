import { SearchInput } from '@common/components';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { SearchAutoComplete } from './DiseaseAutoComplete';
import { useDiseaseSearch } from './useDiseaseSearch';

interface DiseaseSearchPropTypes {
  searchDisease: (keyword: string, type: string) => void;
}

const DiseaseSearch = ({ searchDisease }: DiseaseSearchPropTypes) => {
  const useOutsideClick = (
    ref: React.MutableRefObject<any>,
    handlerCallback: (event?: CustomEvent<MouseEvent>) => void,
  ) => {
    useEffect(() => {
      const listener = (event: CustomEvent<MouseEvent>) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handlerCallback(event);
      };
      document.addEventListener('mousedown', listener as EventListener);
      document.addEventListener('touchstart', listener as EventListener);
      return () => {
        document.removeEventListener('mousedown', listener as EventListener);
        document.removeEventListener('touchstart', listener as EventListener);
      };
    }, [ref, handlerCallback]);
  };

  const {
    searchInput,
    active,
    autoCompleteData,
    selectDiseaseItemHandler,
    handleChangeInput,
    inputFocusHandler,
    inputBlurHandler,
    searchHandler,
  } = useDiseaseSearch(searchDisease, useOutsideClick);

  return (
    <DiseaseSearchWrapper>
      <SearchInput
        inputValue={searchInput}
        onChange={handleChangeInput}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
        onSubmit={searchHandler}
      />
      <SearchAutoComplete
        active={active}
        autoCompleteData={autoCompleteData.data}
        onSelectDisease={selectDiseaseItemHandler}
      />
    </DiseaseSearchWrapper>
  );
};

const DiseaseSearchWrapper = styled.div`
  min-height: 40px;
  position: relative;
`;

export default React.memo(
  DiseaseSearch,
  (prevProps, nextProps) => prevProps.searchDisease === nextProps.searchDisease,
);
