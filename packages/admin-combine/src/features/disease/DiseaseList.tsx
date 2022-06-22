import { Spinner } from '@common/components';
import styled from '@emotion/styled';
import { DiseaseListApiData } from '@src/store/disease/DiseaseState';
import { useEffect, useRef, useState } from 'react';
import { DiseaseRow } from './DiseaseRow';
import { DiseaseRowSkeleton } from './DiseaseRowSkeleton';
import { useDiseaseList } from './useDiseaseList';
import DiseaseSearch from './DiseaseSearch';
import { colors } from '@common/styles';

export function DiseaseList() {
  const [loading, setLoading] = useState(true);
  const {
    diseaseList,
    searchParams,
    hasNextPage,
    getDiseaseList,
    resetDiseaseListResult,
    resetDiseaseListSearchParams,
    changeKeywordHandler,
    changePageHandler,
    changeDiseaseListPageStateHandler,
  } = useDiseaseList();

  const pageEndRef = useRef<HTMLDivElement | null>(null);
  const target = useRef<HTMLDivElement>(null);
  const [diseaseItems, setDiseaseItems] = useState<DiseaseListApiData[]>([]);

  useEffect(() => {
    return () => {
      resetDiseaseListSearchParams();
      resetDiseaseListResult();
    };
  }, []);

  useEffect(() => {
    setLoading(false);
    getDiseaseList();
  }, [searchParams]);

  useEffect(() => {
    if (!diseaseList.error && !diseaseList.loading) {
      if (searchParams.mode === 'SEARCH') setDiseaseItems(diseaseList.data);
      else setDiseaseItems((prev) => [...prev, ...diseaseList.data]);
      setLoading(!diseaseList.loading);
      changeDiseaseListPageStateHandler(diseaseList.paging);
    }
  }, [diseaseList]);

  useEffect(() => {
    if (loading && hasNextPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            changePageHandler();
            if (pageEndRef.current && !hasNextPage) observer.unobserve(pageEndRef.current);
            observer.disconnect();
          }
        },
        { threshold: 1 },
      );
      if (pageEndRef.current) observer.observe(pageEndRef.current);
    }
  }, [loading]);

  console.log(diseaseList.paging);

  return (
    <DiseaseListWrapper>
      <DiseaseSearchWrapper>
        <DiseaseSearch searchDisease={changeKeywordHandler} />
      </DiseaseSearchWrapper>
      <DiseaseContentWrapper>
        {diseaseList.loading ? (
          <DiseaseRowSkeletonWrapper>
            {new Array(7).fill(1).map((_, i) => {
              return <DiseaseRowSkeleton key={i} />;
            })}
          </DiseaseRowSkeletonWrapper>
        ) : (
          <>
            <DiseaseRowWrapper ref={target}>
              {diseaseItems &&
                diseaseItems.map((item, idx) => <DiseaseRow key={idx} diseaseItem={item} />)}
            </DiseaseRowWrapper>
            {hasNextPage && (
              <LoadMoreWrapper>
                <div ref={pageEndRef}>
                  <Spinner onActive={true} fullCover={false} />
                </div>
              </LoadMoreWrapper>
            )}
          </>
        )}
      </DiseaseContentWrapper>
    </DiseaseListWrapper>
  );
}

const DiseaseListWrapper = styled.div`
  width: 100%;
  max-height: 90vh;
`;
const DiseaseSearchWrapper = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid ${colors.gray7};
`;

const DiseaseContentWrapper = styled.div`
  max-height: calc(90vh - 60px);
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0px 16px;
`;

const DiseaseRowSkeletonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
`;
const DiseaseRowWrapper = styled.div`
  margin-top: 20px;
`;

const LoadMoreWrapper = styled.div`
  text-align: center;
  padding: 24px;
  > button {
    font-size: 24px;
  }
`;
