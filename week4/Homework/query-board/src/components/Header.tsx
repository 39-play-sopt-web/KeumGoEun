import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const part = localStorage.getItem('part');

  function handleLogout() {
    localStorage.removeItem('authorizationCode');
    localStorage.removeItem('part');

    navigate('/', { replace: true });
  }

  return (
    <header>
      <Link to="/posts">PLAY SOPT BOARD</Link>
      <span>{part ? `${part} 파트` : '미인증'}</span>

      <nav aria-label="게시판 메뉴">
        <Link to="/posts">게시글 목록</Link>
        <Link to="/posts/new">글쓰기</Link>

        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
      </nav>
    </header>
  );
}

export default Header;