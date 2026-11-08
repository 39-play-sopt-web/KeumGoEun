import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api/post";
import type { UpdatePostRequest } from "../types/post";

export function useUpdate(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: UpdatePostRequest) => updatePost(postId, post),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["posts", "infinite"],
      });

      void queryClient.invalidateQueries({
        queryKey: ["posts", "detail", postId],
      });

      alert("게시글이 수정되었습니다.");
    },

    onError: () => {
      alert("게시글을 수정하지 못했습니다. 인증 코드와 수정 권한을 확인해주세요.");
    },
  });
}