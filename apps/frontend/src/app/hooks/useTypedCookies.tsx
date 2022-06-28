import { useCookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

type TypedCookies = {
    session?: string;
};

export enum Cookies {
    Session = "session",
}

type SetTypedCookieFunction = (
    name: Cookies,
    cookie: TypedCookies[typeof name],
    options?: CookieSetOptions
) => void;

type RemoveCookieFunction = (name: Cookies, options?: CookieSetOptions) => void;

export const useTypedCookies = (): [TypedCookies, SetTypedCookieFunction, RemoveCookieFunction] =>
    useCookies<Cookies, TypedCookies>(Object.values(Cookies));
