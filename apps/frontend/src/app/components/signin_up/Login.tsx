import { Cookies, useTypedCookies } from "../../hooks/useTypedCookies";
import { LoginRequest } from "@todo-app/types";
import { Api } from "../../api/Api";
import { passwordInput, usernameOrEmailInput } from "../validated_form/form-inputs";
import { LoginSignUp } from "./LoginSignUp";

export const Login = () => {
    const [, setCookie] = useTypedCookies();
    const login = (data: LoginRequest) =>
        Api.login(data).then(token => setCookie(Cookies.Session, token, { sameSite: "strict" }));

    return (
        <LoginSignUp
            title={"Login"}
            motivationText={
                <>
                    Boost your productivity <b>today</b>!
                </>
            }
            inputs={[usernameOrEmailInput, passwordInput]}
            submitText={"Login"}
            onSubmit={login}
        />
    );
};
