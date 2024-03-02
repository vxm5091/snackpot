import { ComponentType, ReactElement, Suspense } from 'react';

export function withSuspense<P>(WrappedComponent: ComponentType<P>, fallback: ReactElement | null) {
  return function (props: P) {
    return (
      <Suspense fallback={fallback}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}