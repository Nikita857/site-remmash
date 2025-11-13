import * as React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-100 ${className || ''}`}
      {...props}
    />
  );
};

export { Skeleton };