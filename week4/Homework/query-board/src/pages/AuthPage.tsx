import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthMutation } from "../hooks/useAuthMutation";
import styled from "styled-components";

function AuthPage() {
  const [part, setPart] = useState("");

  // 인증 코드 발급 처리
  const authMutation = useAuthMutation();

  const navigate = useNavigate();

  // 게시판 목록 처리
  function handleGoTOBoard() {
    const authorizationcode = localStorage.getItem("authorizationCode");

    if (!authorizationcode) {
      alert("코드가 발급되지 않았습니다. 코드를 발급해주세요.");
      return;
    }

    navigate("/posts");
  }

  return (
    <AuthContainer>
      <h1>PLAY SOPT 게시판</h1>
      <p>파트를 선택하면 코드가 발급됩니다.</p>

      <AuthRow>
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

        <IssueButton
          type="button"
          onClick={() => authMutation.mutate(part)}
          disabled={part === "" || authMutation.isPending}
        >
          {authMutation.isPending ? "발급 중..." : "코드 발급"}
        </IssueButton>
      </AuthRow>

      {authMutation.isError && (
        <p role="alert">코드 발급에 실패했습니다. 다시 시도해주세요.</p>
      )}

      <BoardButton type="button" onClick={handleGoTOBoard}>
        게시판 목록 보기
      </BoardButton>
    </AuthContainer>
  );
}

export default AuthPage;

const AuthContainer = styled.main`
  max-width: 480px;
  margin: 80px auto;
  padding: 24px;
`;

const AuthRow = styled.div`
  display: flex;
  gap: 8px;

  select {
    flex: 1;
    min-width: 0;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }

  select:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
  }
`;

const IssueButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  white-space: nowrap;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;

const BoardButton = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;
