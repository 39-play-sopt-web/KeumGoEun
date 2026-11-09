import { useQuery } from '@tanstack/react-query';
import { getPostDetail } from '../api/post';

export function usePostDetail(postId: number) {
  return useQuery({
    queryKey: ['posts', 'detail', postId],
    queryFn: () => getPostDetail(postId),
    enabled: Number.isInteger(postId) && postId > 0,
  });
}