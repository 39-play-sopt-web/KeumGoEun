import { useState } from 'react';
import { Link } from 'react-router-dom';

function PostCreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [step, setStep] = useState(1);

  const isTitleTooLong = title.length > 50;
  const isContentTooLong = content.length > 1000;

  return (
    <main>
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

          <div>
            <Link to="/posts">목록으로</Link>

            <button
              type="button"
              disabled={title.trim() === '' || isTitleTooLong}
              onClick={() => setStep(2)}
            >
              다음
            </button>
          </div>
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

          <div>
            <Link to="/posts">목록으로</Link>

            <button type="button" onClick={() => setStep(1)}>
              이전
            </button>

            <button
              type="button"
              disabled={content.trim() === '' || isContentTooLong}
              onClick={() => setStep(3)}
            >
              다음
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section>
          <h2>작성자 입력</h2>
          <p>여기에 작성자 입력창을 추가할 예정이에요.</p>

          <div>
            <Link to="/posts">목록으로</Link>

            <button type="button" onClick={() => setStep(2)}>
              이전
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default PostCreatePage;
