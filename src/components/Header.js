import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="navbar bg-danger" data-bs-theme="dark" expand="md">
      <NavbarBrand style={{ color: 'white' }} href="/factories">Factory Insight</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink
            to="/factories"
            activeClassName="active"
            className="nav-link"
          >
            Factories
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/codex"
            activeClassName="active"
            className="nav-link"
          >
            Codex
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;