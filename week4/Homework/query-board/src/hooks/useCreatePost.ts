import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/post';

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,

    onSuccess: (createdPost) => {
      void queryClient.invalidateQueries({
        queryKey: ['posts'],
      });

      alert(`${createdPost.author}님의 글이 등록되었습니다.`);
      navigate('/posts');
    },

    onError: () => {
      alert('게시글 작성에 실패했습니다. 다시 시도해 주세요.');
    },
  });
}