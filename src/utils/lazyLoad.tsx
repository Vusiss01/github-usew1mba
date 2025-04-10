import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const lazyLoad = (importFn: () => Promise<any>) => {
  const LazyComponent = lazy(importFn);
  
  return function LazyWrapper(props: any) {
    return (
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      }>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}; 