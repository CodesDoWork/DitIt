import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/imgs/logo.png";
import { NavDropdown, Stack } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import AccountIcon from "../../../assets/imgs/user.svg";
import { Cookies, useTypedCookies } from "../../hooks/useTypedCookies";

export const Header = () => {
    const user = useContext(UserContext);
    const navigation = user ? <AuthorizedNavigation /> : <UnauthorizedNavigation />;

    return (
        <header>
            <div className="d-flex justify-content-between align-content-center p-5">
                <Link to="/">
                    <img className={"w-30"} src={logo} alt={"Logo"} />
                </Link>
                <Stack direction="horizontal" gap={3} className="links">
                    {navigation}
                </Stack>
            </div>
            <hr className={"m-0"} />
        </header>
    );
};

const UnauthorizedNavigation = () => (
    <>
        <Link className="btn btn-primary" to="/login">
            Login
        </Link>
        <Link className="btn btn-primary" to="/register">
            Sign Up
        </Link>
    </>
);

const AuthorizedNavigation = () => {
    const [, , removeCookie] = useTypedCookies();

    return (
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
            <NavDropdown.Item as={Link} to={"/"} onClick={() => removeCookie(Cookies.Session)}>
                Logout
            </NavDropdown.Item>
        </NavDropdown>
    );
};
