import { createContext, PropsWithChildren, useContext } from "react";
import { UserDto } from "@todo-app/types";
import { Api } from "../api/Api";
import { createCtx } from "./createContext";
import { Cookies, useTypedCookies } from "../hooks/useTypedCookies";
import { ErrorContext, ErrorMsg } from "./ErrorContext";

const loginError = "LoginError";

export const [PrivateUserContext, PrivateUserProvider] = createCtx<UserDto | null>(null);

export const UserContext = createContext<UserDto | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => (
    <PrivateUserProvider>
        <UserContextProvider children={children} />
    </PrivateUserProvider>
);

const UserContextProvider = ({ children }: PropsWithChildren) => {
    const [cookies, , removeCookie] = useTypedCookies();
    const { state: user, update: setUser } = useContext(PrivateUserContext);
    const { state: errMsg, update: setErrMsg } = useContext(ErrorContext);

    if (cookies.session && !user && errMsg?.type !== loginError) {
        Api.authorize(cookies.session, res => {
            switch (res) {
                case null:
                    removeCookie(Cookies.Session);
                    break;
                case undefined:
                    setErrMsg(
                        new ErrorMsg("Something went wrong! Please try again later.", loginError)
                    );
                    break;
                default:
                    setUser(res);
            }
        });
    } else if (!cookies.session) {
        user && setUser(null);
        Api.logout();
    }

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
