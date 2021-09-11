import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import BackDrop from '../UI/BackDrop';

const MenuBtn = styled.button`
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2rem;
  cursor: pointer;
  > span {
    display: block;
    width: 3rem;
    height: 2.5px;
    background: white;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  color: white;
  a {
    text-decoration: none;
    color: white;
  }
`;

const HeaderNav = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const DrawerNav = styled.nav`
  height: 100%;
`;

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <Fragment>
      {drawerIsOpen && <BackDrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <DrawerNav>
          <NavLinks />
        </DrawerNav>
      </SideDrawer>
      <MainHeader>
        <MenuBtn onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </MenuBtn>
        <Title>
          <Link to='/'>Your Places</Link>
        </Title>
        <HeaderNav>
          <NavLinks />
        </HeaderNav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
