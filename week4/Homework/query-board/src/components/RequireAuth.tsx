import { useEffect, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function RequireAuth() {
  const authorizationCode = localStorage.getItem('authorizationCode');
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!authorizationCode && !hasAlerted.current) {
      hasAlerted.current = true;
      alert('먼저 회원 코드를 발급받아 주세요.');
    }
  }, [authorizationCode]);

  if (!authorizationCode) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;