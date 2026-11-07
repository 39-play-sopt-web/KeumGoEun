import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  padding: 0 32px;
  box-sizing: border-box;

  background-color: #1a1b24;
  border-bottom: 1px solid #333333;
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-weight: 800;
  text-decoration: none;

`;

function Header() {
  return (
    <HeaderContainer>
      <Logo to="/">
        <span>GoraniTV</span>
      </Logo>
    </HeaderContainer>
  );
}

export default Header;
