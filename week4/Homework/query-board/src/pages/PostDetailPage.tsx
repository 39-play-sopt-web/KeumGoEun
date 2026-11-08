import { Link, useParams } from "react-router-dom";
import { usePostDetail } from "../hooks/usePostDetail";
import { useDelete } from "../hooks/useDelete";

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
    <main>
      <Link to="/posts">목록으로</Link>

      <article>
        <h1>{post.title}</h1>

        <div>
          <span>{post.author}</span>{" "}
          <time dateTime={post.createdAt}>
            {new Date(`${post.createdAt}Z`).toLocaleString("ko-KR", {
              timeZone: "Asia/Seoul",
            })}
          </time>
        </div>

        <p>{post.content}</p>
      </article>

      <button
        type="button"
        onClick={handleDelete}
        disabled={deletePostMutation.isPending}
      >
        {deletePostMutation.isPending ? "삭제 중..." : "삭제"}
      </button>
      <Link to={`/posts/${id}/edit`}>수정</Link>
    </main>
  );
}

export default PostDetailPage;
