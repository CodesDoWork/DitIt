import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { UserDto } from "@todo-app/types";
import { Api } from "../api/Api";
import { createCtx } from "./createContext";
import { Cookies, useTypedCookies } from "../hooks/useTypedCookies";
import { ErrorContext } from "./ErrorContext";

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
    const { update: setErrMsg } = useContext(ErrorContext);

    useEffect(() => {
        if (cookies.session && !user) {
            Api.authorize(cookies.session, res => {
                switch (res) {
                    case null:
                        removeCookie(Cookies.Session);
                        break;
                    case undefined:
                        setErrMsg("Something went wrong! Please try again later.");
                        break;
                    default:
                        setUser(res);
                }
            });
        } else if (!cookies.session) {
            user && setUser(null);
            Api.logout();
        }
    }, [user, cookies, removeCookie, setUser, setErrMsg]);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
