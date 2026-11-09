import { useState } from "react";
import type { Post } from "../types/post";
import { useNavigate } from "react-router-dom";
import { useUpdate } from "../hooks/useUpdate";
import styled from "styled-components";

type PostEditProps = {
  post: Post;
  onCancel: () => void;
};

function PostEdit({ post, onCancel }: PostEditProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const navigate = useNavigate();
  const updatePostMutation = useUpdate(post.id);

  function handleUpdate() {
    if (updatePostMutation.isPending) return;

    if (!title.trim() || !content.trim()) {
      alert("제목과 본문을 모두 입력해주세요.");
      return;
    }

    if (title.length > 50 || content.length > 1000) {
      alert("제목은 50자 그리고 본문은 1000자까지 입력해주세요.");
      return;
    }

    updatePostMutation.mutate(
      {
        title: title.trim(),
        content: content.trim(),
      },
      {
        onSuccess: () => {
          navigate(`/posts/${post.id}`, { replace: true });
        },
      },
    );
  }

  return (
    <section>
      <h2>게시글 수정</h2>

      <label htmlFor="edit-title">제목</label>
      <input
        id="edit-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={50}
      />
      <p>{title.length} / 50</p>

      <label htmlFor="edit-content">본문</label>
      <textarea
        id="edit-content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        maxLength={1000}
      />
      <p>{content.length} / 1000</p>
      <ButtonGroup>
        <button
          type="button"
          onClick={onCancel}
          disabled={updatePostMutation.isPending}
        >
          취소
        </button>

        <SaveButton
          type="button"
          onClick={handleUpdate}
          disabled={
            !title.trim() || !content.trim() || updatePostMutation.isPending
          }
        >
          {updatePostMutation.isPending ? "수정 중..." : "수정 완료"}
        </SaveButton>
      </ButtonGroup>
    </section>
  );
}

export default PostEdit;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  button {
    padding: 10px 16px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    transition: background-color 0.2s;
  }

  > button:first-child {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  > button:first-child:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  button:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;
