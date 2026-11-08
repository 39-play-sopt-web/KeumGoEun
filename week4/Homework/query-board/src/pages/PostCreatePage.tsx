import { useState } from "react";
import { Link } from "react-router-dom";
import { useCreatePostMutation } from "../hooks/useCreatePost";
import styled from "styled-components";

function PostCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [step, setStep] = useState(1);
  const createPostMutation = useCreatePostMutation();

  const isTitleTooLong = title.length > 50;
  const isContentTooLong = content.length > 1000;
  const isAuthorTooLong = author.length > 20;

  function handleCreatePost() {
    const isInvalid =
      title.trim() === "" ||
      title.length > 50 ||
      content.trim() === "" ||
      content.length > 1000 ||
      author.trim() === "" ||
      author.length > 20;

    if (isInvalid) {
      alert("입력 내용과 글자 수를 확인해 주세요.");
      return;
    }

    if (createPostMutation.isPending) {
      return;
    }

    createPostMutation.mutate({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    });
  }

  return (
    <CreateContainer>
      <h1>글쓰기</h1>

      {step === 1 && (
        <section>
          <label htmlFor="title">제목</label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <p>{title.length} / 50</p>

          {isTitleTooLong && (
            <p role="alert">제목은 50자 이하로 입력해 주세요.</p>
          )}

          <ButtonGroup>
            <Link to="/posts">목록으로</Link>

            <button
              type="button"
              disabled={title.trim() === "" || isTitleTooLong}
              onClick={() => setStep(2)}
            >
              다음
            </button>
          </ButtonGroup>
        </section>
      )}

      {step === 2 && (
        <section>
          <label htmlFor="content">본문</label>

          <textarea
            id="content"
            rows={8}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />

          <p>{content.length} / 1000</p>

          {isContentTooLong && (
            <p role="alert">본문은 1000자 이하로 입력해 주세요.</p>
          )}

          <ButtonGroup>
            <Link to="/posts">목록으로</Link>

            <button type="button" onClick={() => setStep(1)}>
              이전
            </button>

            <button
              type="button"
              disabled={content.trim() === "" || isContentTooLong}
              onClick={() => setStep(3)}
            >
              다음
            </button>
          </ButtonGroup>
        </section>
      )}

      {step === 3 && (
        <section>
          <label htmlFor="author">작성자</label>

          <input
            id="author"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />

          <p>{author.length} / 20</p>

          {isAuthorTooLong && (
            <p role="alert">작성자는 20자 이하로 입력해 주세요.</p>
          )}

          <ButtonGroup>
            <Link to="/posts">목록으로</Link>

            <button type="button" onClick={() => setStep(2)}>
              이전
            </button>

            <button
              type="button"
              onClick={handleCreatePost}
              disabled={
                author.trim() === "" ||
                isAuthorTooLong ||
                createPostMutation.isPending
              }
            >
              {createPostMutation.isPending ? "등록 중..." : "작성"}
            </button>
          </ButtonGroup>
        </section>
      )}
    </CreateContainer>
  );
}

export default PostCreatePage;

const CreateContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px;

  h1 {
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
    margin: 8px 0;
    text-align: right;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  p[role="alert"] {
    text-align: left;
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;

  a,
  button {
    padding: 10px 16px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font: inherit;
    transition: background-color 0.2s;
  }

  a:hover,
  button:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  button:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;