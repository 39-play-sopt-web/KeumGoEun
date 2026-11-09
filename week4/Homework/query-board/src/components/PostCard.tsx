import type { Post } from "../types/post";
import { Link } from "react-router-dom";
import styled from "styled-components";

type PostCardProps = {
  post: Post;
};

function PostCard(props: PostCardProps) {
  const post = props.post;

  console.log("제목:", post.title, "서버 작성 시각:", post.createdAt);

  return (
    <Link to={`/posts/${post.id}`}>
      <Card>
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
      </Card>
    </Link>
  );
}

export default PostCard;

const Card = styled.article`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow-wrap: anywhere;

  transition: background-color 0.2s;

  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    border-color: ${({ theme }) => theme.colors.focus};
  }

  h2 {
    margin: 0 0 8px;
    font-size: 18px;
  }

  p {
    margin: 0 0 16px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
