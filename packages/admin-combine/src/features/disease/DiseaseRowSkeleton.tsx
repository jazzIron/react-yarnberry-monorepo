import { Skeleton } from '@common/components';
import {
  SkeletonInfo,
  SkeletonContentItem,
  SKELETON_SIZE,
} from '@common/components/src/components/skeleton/skeleton_styled';
import styled from '@emotion/styled';

export function DiseaseRowSkeleton() {
  return (
    <DiseaseRowSkeletonWrapper>
      <Skeleton gap={8} padding={10}>
        <SkeletonInfo>
          <SkeletonContentItem size={SKELETON_SIZE.XSMALL} />
          <SkeletonContentItem size={SKELETON_SIZE.XSMALL} />
          <SkeletonContentItem size={SKELETON_SIZE.SMALL} />
        </SkeletonInfo>
      </Skeleton>
    </DiseaseRowSkeletonWrapper>
  );
}

const DiseaseRowSkeletonWrapper = styled.div`
  margin-bottom: 8px;
  > div {
    height: 100px;
  }
  > div:last-child {
    margin-bottom: 0px;
  }
`;
