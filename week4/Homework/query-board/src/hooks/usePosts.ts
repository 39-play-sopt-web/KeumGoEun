import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../api/post";

export function usePosts(keyword: string='') {
    return useInfiniteQuery({
        queryKey: ['posts', "infinite",keyword ],
        queryFn: ({pageParam}) => getPosts(keyword,pageParam),

        initialPageParam: undefined as number | undefined,

        getNextPageParam: (lastPage) => {
            if (!lastPage.hasNext) {
                return undefined;
            }

        return lastPage.nextCursor ?? undefined;
        }
    });

}