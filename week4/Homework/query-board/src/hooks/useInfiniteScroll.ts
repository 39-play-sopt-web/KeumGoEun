import { useEffect, useRef } from 'react';

type InfiniteScrollOptions = {
  hasNextPage: boolean;
  isFetching: boolean;
  isFetchNextPageError: boolean;
  fetchNextPage: () => Promise<unknown>;
};

export function useInfiniteScroll({
  hasNextPage,
  isFetching,
  isFetchNextPageError,
  fetchNextPage,
}: InfiniteScrollOptions) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !hasNextPage || isFetching || isFetchNextPageError) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void fetchNextPage();
      }
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetching, isFetchNextPageError, fetchNextPage]);

  return loadMoreRef;
}