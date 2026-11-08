import type { Post } from "../types/post";

type PostCardProps = {
  post: Post;
};

function PostCard(props: PostCardProps) {
  const post = props.post;

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <div>
        <span>작성자: {post.author}</span>
        <time dateTime={post.createdAt}>
        {new Date(post.createdAt).toLocaleString('ko-KR')}
        </time>

      </div>

    </article>
  );
}

export default PostCard;