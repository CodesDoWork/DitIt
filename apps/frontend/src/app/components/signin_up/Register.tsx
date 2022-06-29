import { Cookies, useTypedCookies } from "../../hooks/useTypedCookies";
import { CreateUserDto } from "@todo-app/types";
import { Api } from "../../api/Api";
import { confirmPasswordInput, emailInput, usernameInput } from "../validated_form/form-inputs";
import { LoginSignUp } from "./LoginSignUp";

export const Register = () => {
    const [, setCookie] = useTypedCookies();
    const register = (data: CreateUserDto) =>
        Api.register(data).then(() =>
            Api.login({
                username: data.username,
                password: data.password,
            }).then(token => setCookie(Cookies.Session, token, { sameSite: "strict" }))
        );

    return (
        <LoginSignUp
            title={"Sign Up"}
            motivationText={
                <>
                    <b>Start</b> boosting your productivity <b>today</b>!
                </>
            }
            inputs={[usernameInput, emailInput, confirmPasswordInput]}
            submitText={"Sign Up"}
            onSubmit={register}
        />
    );
};
