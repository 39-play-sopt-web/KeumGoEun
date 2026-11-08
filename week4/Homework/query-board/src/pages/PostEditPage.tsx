import { Link, useNavigate, useParams } from "react-router-dom";
import { usePostDetail } from "../hooks/usePostDetail";
import PostEdit from "../components/PostEdit";


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
    <main>
      <PostEdit
        key={id}
        post={postQuery.data}
        onCancel={() => navigate(`/posts/${id}`)}
      />
    </main>
  );
}

export default PostEditPage;