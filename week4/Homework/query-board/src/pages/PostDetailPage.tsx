import { Link, useParams } from "react-router-dom";
import { usePostDetail } from "../hooks/usePostDetail";
import { useDelete } from "../hooks/useDelete";
import styled from "styled-components";

function PostDetailPage() {
  const { postId } = useParams();

  const id = Number(postId);
  const isValidId = Number.isInteger(id) && id > 0;

  const postQuery = usePostDetail(id);

  const deletePostMutation = useDelete();

  function handleDelete() {
    const authorizationCode = localStorage.getItem("authorizationCode");

    if (!authorizationCode) {
      alert("먼저 회원 코드를 발급받아 주세요.");
      return;
    }

    const confirmed = window.confirm("정말 삭제할까요?");

    if (!confirmed) {
      return;
    }

    deletePostMutation.mutate(id);
  }

  if (!isValidId) {
    return (
      <main>
        <p>잘못된 게시글 주소입니다.</p>
        <Link to="/posts">목록으로</Link>
      </main>
    );
  }

  if (postQuery.isPending) {
    return <p>게시글을 불러오는 중...</p>;
  }

  if (postQuery.isError) {
    return (
      <main>
        <p>게시글을 불러오지 못했습니다.</p>
        <Link to="/posts">목록으로</Link>
      </main>
    );
  }

  const post = postQuery.data;

  return (
    <DetailContainer>
      <BackLink to="/posts">← 목록으로</BackLink>

      <article>
        <h1>{post.title}</h1>

        <div>
          <span>작성자: {post.author}</span>{" "}
          <time dateTime={post.createdAt}>
            {new Date(`${post.createdAt}Z`).toLocaleString("ko-KR", {
              timeZone: "Asia/Seoul",
            })}
          </time>
        </div>

        <p>{post.content}</p>
      </article>

      <DetailActions>
        <Link to={`/posts/${id}/edit`}>수정</Link>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deletePostMutation.isPending}
        >
          {deletePostMutation.isPending ? "삭제 중..." : "삭제"}
        </button>
      </DetailActions>
    </DetailContainer>
  );
}

export default PostDetailPage;

const DetailContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px;

  article {
    margin: 24px 0;
    padding: 24px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.surface};
    overflow-wrap: anywhere;
  }

  h1 {
    margin: 0 0 12px;
    font-size: 28px;
  }

  article div {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 13px;
  }

  article p {
    margin-top: 32px;
    line-height: 1.5;
    white-space: pre-wrap;
  }
`;

const DetailActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  a,
  button {
    padding: 10px 16px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.background};
    font: inherit;
    transition: background-color 0.2s;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    color: ${({ theme }) => theme.colors.danger};
  }

  a:hover,
  button:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  button:disabled {
    color: ${({ theme }) => theme.colors.disabledText};
    background-color: ${({ theme }) => theme.colors.disabledBackground};
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;
