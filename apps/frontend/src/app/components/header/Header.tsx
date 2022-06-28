import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/imgs/logo.png";
import { NavDropdown, Stack } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import AccountIcon from "../../../assets/imgs/user.svg";
import { Cookies, useTypedCookies } from "../../hooks/useTypedCookies";

type HeaderProps = {};

export const Header = (props: HeaderProps) => {
    const user = useContext(UserContext);
    const [, , removeCookie] = useTypedCookies();

    const links = user
        ? [
              <NavDropdown
                  title={
                      <>
                          <img className={"icon me-2 mb-1"} src={AccountIcon} alt={""} />
                          Account
                      </>
                  }>
                  <NavDropdown.Item as={Link} to="/dashboard">
                      Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">
                      Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                      as={Link}
                      to={"/"}
                      onClick={() => removeCookie(Cookies.Session)}>
                      Logout
                  </NavDropdown.Item>
              </NavDropdown>,
          ]
        : [
              <Link className="btn btn-primary" to="/login">
                  Login
              </Link>,
              <Link className="btn btn-primary" to="/register">
                  Sign Up
              </Link>,
          ];

    return (
        <header>
            <div className="d-flex justify-content-between align-content-center header-container">
                <Link to="/">
                    <img src={logo} alt={"Logo"} />
                </Link>
                <Stack direction="horizontal" gap={3} className="links">
                    {links}
                </Stack>
            </div>
            <hr />
        </header>
    );
};
