import styled from '@emotion/styled';
import { DiseaseListApi } from '@src/store/disease/DiseaseState';
import { isNull } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { DiseaseRow } from './DiseaseRow';
import { useDiseaseList } from './useDiseaseList';
import { useDiseaseSearch } from './useDiseaseSearch';

export function DiseaseList() {
  const [loading, setLoading] = useState(true);
  const { diseaseList, getDiseaseList } = useDiseaseList();
  const {
    searchParams,
    hasNextPage,
    resetDiseaseListSearchParams,
    changeKeywordHandler,
    changeSubjectHandler,
    changePageHandler,
    changeDiseaseListPageStateHandler,
  } = useDiseaseSearch();

  const target = useRef<HTMLDivElement>(null);
  const [diseaseItems, setDiseaseItems] = useState<DiseaseListApi[]>([]);

  if (isNull(diseaseList.data)) return <>데이터없음</>;

  /* 초기 아이템 로딩 */
  useEffect(() => {
    if (searchParams.mode === 'SEARCH') {
      setLoading(false);
      getDiseaseList();
    }
  }, [searchParams]);

  useEffect(() => {
    return () => {
      resetDiseaseListSearchParams();
    };
  }, []);

  useEffect(() => {
    if (!diseaseList.error && !diseaseList.loading) {
      setDiseaseItems((prev) => [...diseaseItems, ...diseaseList.data]);
      setLoading(!diseaseList.loading);
      changeDiseaseListPageStateHandler(diseaseList.paging);
    }
  }, [diseaseList]);

  const pageEnd = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            changePageHandler();
            if (pageEnd.current && !hasNextPage) observer.unobserve(pageEnd.current);
            observer.disconnect();
          }
        },
        { threshold: 1 },
      );
      if (pageEnd.current) observer.observe(pageEnd.current);
    }
  }, [loading]);

  return (
    <DiseaseListWrapper>
      <DiseaseRowWrapper ref={target}>
        {diseaseItems &&
          diseaseItems.map((item, idx) => <DiseaseRow key={idx} diseaseItem={item} />)}
      </DiseaseRowWrapper>
      {!diseaseList.loading && (
        <LoadMoreWrapper>
          <div onClick={changePageHandler} ref={pageEnd}>
            Load More
          </div>
        </LoadMoreWrapper>
      )}
    </DiseaseListWrapper>
  );
}

const DiseaseListWrapper = styled.div``;
const DiseaseRowWrapper = styled.div``;
const LoadMoreWrapper = styled.div`
  text-align: center;
  padding: 24px;
  > button {
    font-size: 24px;
  }
`;
