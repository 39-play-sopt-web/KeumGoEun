import type { Post } from "../types/post";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Post;
};

function PostCard(props: PostCardProps) {
  const post = props.post;

  console.log('제목:', post.title, '서버 작성 시각:', post.createdAt);

  return (
    <Link to={`/posts/${post.id}`}>
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>

        <div>
          <span>작성자: {post.author}</span>
          <time dateTime={post.createdAt}>
            {new Date(`${post.createdAt}Z`).toLocaleString("ko-KR", {
              timeZone: "Asia/Seoul",
            })}
          </time>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
