import React from "react";
import PropTypes from "prop-types";
import "./Nav.css";

const Nav = ({ Icon, title, onClick }) => {
  return (
    <div className="nav" onClick={onClick}>
      {Icon && <Icon className="icon" />}
      <h2>{title ? title : null}</h2>
    </div>
  );
};

Nav.propTypes = {
  Icon: PropTypes.elementType,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default Nav;
