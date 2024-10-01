import styled from 'styled-components';

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px;
  background-color: black;
  color: #fff;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  font-size: 18px;

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #00bfff;
    }
  }
`;