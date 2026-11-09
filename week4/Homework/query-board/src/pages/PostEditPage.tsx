import { Link, useNavigate, useParams } from "react-router-dom";
import { usePostDetail } from "../hooks/usePostDetail";
import PostEdit from "../components/PostEdit";
import styled from "styled-components";

function PostEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const id = Number(postId);
  const isValidId = Number.isInteger(id) && id > 0;

  const postQuery = usePostDetail(id);

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

  return (
    <EditContainer>
      <PostEdit
        key={id}
        post={postQuery.data}
        onCancel={() => navigate(`/posts/${id}`)}
      />
    </EditContainer>
  );
}

export default PostEditPage;

const EditContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px;

  h2 {
    margin: 0 0 24px;
    font-size: 28px;
  }

  label {
    display: block;
    margin-bottom: 8px;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }

  textarea {
    min-height: 200px;
  }

  input:focus,
  textarea:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 1px;
  }

  p {
    margin: 8px 0 24px;
    text-align: right;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;