import { ValidatedForm, ValidatedFormProps } from "../validated_form/ValidatedForm";
import { Stack } from "react-bootstrap";
import Rocket from "../../../assets/imgs/rocket.svg";
import "./LoginSignUp.scss";
import { Api } from "../../api/Api";
import {
    confirmPasswordInput,
    emailInput,
    passwordInput,
    usernameInput,
    usernameOrEmailInput,
} from "../validated_form/form-inputs";
import { CreateUserDto, LoginRequest } from "@todo-app/types";
import { Cookies, useTypedCookies } from "../../hooks/useTypedCookies";

type LoginSignUpProps<T extends object> = ValidatedFormProps<T> & {
    title: string;
    motivationText: JSX.Element;
};

function LoginSignUp<T extends object>({
    title,
    motivationText,
    ...formProps
}: LoginSignUpProps<T>) {
    return (
        <main>
            <h1>{title}</h1>
            <Stack gap={5} direction="horizontal">
                <ValidatedForm {...formProps} />
                <div className="motivation">
                    <img src={Rocket} alt={"Motivational rocket"} />
                    <h3>{motivationText}</h3>
                </div>
            </Stack>
        </main>
    );
}

export const Login = () => {
    const [, setCookie] = useTypedCookies();
    const login = (data: LoginRequest) =>
        Api.login(data).then(token => setCookie(Cookies.Session, token));

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

export const Register = () => {
    const [, setCookie] = useTypedCookies();
    const register = (data: CreateUserDto) =>
        Api.register(data).then(() =>
            Api.login({
                username: data.username,
                password: data.password,
            }).then(token => setCookie(Cookies.Session, token))
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
