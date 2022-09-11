import React from "react";
//import profile from "../blankprofile.png";
//import logo from "./logo.png"; // Tell webpack this JS file uses this image

import {
  Nav,
  StyledBsPersonCircle,
  Bars,
  NavMenu,
  NavBtn,
  textTitlC,
} from "./NavbarElements";
import { icons } from "react-icons";
//import  logo  from './companyLogo.png';
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <h1>Calendar Spice </h1>
        <NavMenu>
          <StyledBsPersonCircle />
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
