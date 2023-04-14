import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const FactoryNavItem = ({ active, factory, onClick, onClose }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(factory);
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose(factory);
  };

  return (
    <NavItem>
      <NavLink active={active} href="#" onClick={handleClick}>
        {factory.name}
        <FontAwesomeIcon icon={faTimes} style={{ marginLeft: 5, color: 'red' }} onClick={handleClose} />
      </NavLink>
    </NavItem>
  );
};

export default FactoryNavItem;