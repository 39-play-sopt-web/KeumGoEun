import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Header() {
  const navigate = useNavigate();
  const part = localStorage.getItem("part");

  function handleLogout() {
    localStorage.removeItem("authorizationCode");
    localStorage.removeItem("part");

    navigate("/", { replace: true });
  }

  return (
    <HeaderContainer>
      <HeaderLeft>
        <TitleLink to="/posts">PLAY SOPT BOARD</TitleLink>
        <PartBadge>{part ? `${part} 파트` : "미인증"}</PartBadge>
      </HeaderLeft>

      <HeaderNav aria-label="게시판 메뉴">
        <Link to="/posts">게시글 목록</Link>
        <Link to="/posts/new">글쓰기</Link>

        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
      </HeaderNav>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  position: sticky;
  top: 0;
  z-index: 100;

  padding: 20px 32px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TitleLink = styled(Link)`
  font-size: 20px;
  font-weight: 700;
`;

const PartBadge = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  a,
  button {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    font: inherit;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  a:hover,
  button:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  a:focus-visible,
  button:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
  }
`;
