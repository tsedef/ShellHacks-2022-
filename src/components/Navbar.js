import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  textTitlC,
} from "./NavbarElements";
//import  logo  from './companyLogo.png';
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <h1>Calendar Spice</h1>
      </Nav>
    </>
  );
};

export default Navbar;
