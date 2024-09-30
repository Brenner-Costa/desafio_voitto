import React from 'react';
import Link from 'next/link';
import { NavContainer, NavLinks, NavItem, Title } from './styles'
import { navbarData } from '@/constants/Navbar';

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <NavContainer>
      <Title>{title}</Title>
      <NavLinks>
        {navbarData.map((item) => (
          <NavItem key={item.uid}>
            <Link href={item.uid}>{item.title}</Link>
          </NavItem>
        ))}
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;
