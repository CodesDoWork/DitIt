import { ValidatedForm } from "../validated_form/ValidatedForm";
import {
    currentPasswordInput,
    emailInput,
    forenameInput,
    newPasswordInput,
    surnameInput,
    usernameInput,
} from "../validated_form/form-inputs";
import { Api } from "../../api/Api";
import { useContext } from "react";
import { PrivateUserContext } from "../../contexts/UserContext";
import { Alert } from "react-bootstrap";
import { Cookies, useTypedCookies } from "../../hooks/useTypedCookies";
import { useCatchWithMsg } from "../../hooks/useCatchWithMsg";
import { ConfirmButton } from "../confirm_button/ConfirmButton";
import { useNavigate } from "react-router-dom";

type ChangePasswordProps = {
    currentPassword: string;
    password: string;
};

export const Profile = () => {
    const { state: userState, update: setUser } = useContext(PrivateUserContext);
    // can't be null because of routing in app.tsx
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = userState!; //NOSONAR
    const { todoLists, ...userData } = user;

    const [, , removeCookie] = useTypedCookies();
    const catchWithMsg = useCatchWithMsg();
    const navigate = useNavigate();

    const changePassword = async ({ currentPassword, password }: ChangePasswordProps) =>
        Api.login({ username: user.username, password: currentPassword }).then(() =>
            Api.patchMe({ password })
        );

    const deleteAccount = () =>
        catchWithMsg(
            Api.deleteMe().then(() => {
                removeCookie(Cookies.Session);
                navigate("/");
            })
        );

    return (
        <main>
            <h1>Your Profile</h1>
            <ValidatedForm
                submitText={"Save"}
                inputs={[usernameInput, emailInput, forenameInput, surnameInput]}
                onSubmit={data => Api.patchMe(data).then(setUser)}
                prefilledData={{ ...userData } as Record<string, string | number | null>}
            />
            <hr />

            <h2>Change Password</h2>
            <ValidatedForm
                submitText={"Change"}
                inputs={[currentPasswordInput, newPasswordInput]}
                onSubmit={changePassword}
            />
            <hr />

            <Alert variant={"danger"}>
                <Alert.Heading>Danger Zone</Alert.Heading>
                <hr />
                <div className="d-flex justify-content-between">
                    Your account will be deleted permanently. All your data will be lost instantly!
                    <ConfirmButton
                        variant="outline-danger"
                        modalVariant={"danger"}
                        title={"Delete Profile"}
                        msg={"Do you really want to delete your account?"}
                        onConfirm={deleteAccount}>
                        Delete my account
                    </ConfirmButton>
                </div>
            </Alert>
        </main>
    );
};
