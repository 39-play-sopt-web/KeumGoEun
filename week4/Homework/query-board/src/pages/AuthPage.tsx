import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthMutation } from "../hooks/useAuthMutation";

function AuthPage() {
  const [part, setPart] = useState("");

  // 인증 코드 발급 처리
  const authMutation = useAuthMutation();

  const navigate = useNavigate();

  // 게시판 목록 처리
  function handleGoTOBoard() {
    const authorizationcode = localStorage.getItem("authorizationCode");

    console.log("저장된 코드가 있나요?", authorizationcode !== null);

    if (!authorizationcode) {
      alert("코드가 발급되지 않았습니다. 코드를 발급해주세요.");
      return;
    }

    navigate("/posts");
  }

  return (
    <main>
      <h1>PLAY SOPT 게시판</h1>
      <p>파트를 선택하면 코드가 발급됩니다.</p>

      <select
        aria-label="파트 선택"
        value={part}
        onChange={(event) => setPart(event.target.value)}
      >
        <option value="" disabled hidden>
          파트를 선택하세요
        </option>
        <option value="WEB">WEB</option>
        <option value="ANDROID">ANDROID</option>
        <option value="IOS">IOS</option>
      </select>

      <button
        type="button"
        onClick={() => authMutation.mutate(part)}
        disabled={part === "" || authMutation.isPending}
      >
        {authMutation.isPending ? "발급 중..." : "코드 발급"}
      </button>

      <button type="button" onClick={handleGoTOBoard}>
        게시판 목록 보기
      </button>
    </main>
  );
}

export default AuthPage;
