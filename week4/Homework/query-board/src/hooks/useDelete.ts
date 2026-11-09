import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../api/post";

export function useDelete() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["posts", "infinite"],
      });

      alert("게시글이 삭제되었습니다.");
      navigate("/posts", { replace: true });
    },

    onError: () => {
      alert("게시글을 삭제하지 못했습니다. 인증 코드와 삭제 권한을 확인해주세요.");
    },
  });
}