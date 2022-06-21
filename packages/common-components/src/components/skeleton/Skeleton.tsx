import { SkeletonWrapper } from './skeleton_styled';

interface SkeletonOption {
  gap: number;
  padding: number;
  height: number;
  bordered: boolean;
  children: string | JSX.Element | JSX.Element[];
}

export function Skeleton({ gap, padding, height, bordered, children }: SkeletonOption) {
  return (
    <SkeletonWrapper gap={gap} padding={padding} height={height} bordered={bordered}>
      {children}
    </SkeletonWrapper>
  );
}

Skeleton.defaultProps = {
  gap: 8,
  padding: 10,
  height: 80,
  bordered: true,
};
