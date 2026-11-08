import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/post";

export function usePosts(keyword: string='') {
    return useQuery({
        queryKey: ['posts', keyword],
        queryFn: () => getPosts(keyword),
    });

}