import { ValidatedForm } from "../validated_form/ValidatedForm";
import {
    emailInput,
    forenameInput,
    newPasswordInput,
    currentPasswordInput,
    surnameInput,
    usernameInput,
} from "../validated_form/form-inputs";
import { Api } from "../../api/Api";
import { useContext } from "react";
import { PrivateUserContext } from "../../contexts/UserContext";
import { Alert, Button } from "react-bootstrap";
import { Cookies, useTypedCookies } from "../../hooks/useTypedCookies";
import { ErrorContext, ErrorMsg } from "../../contexts/ErrorContext";

type ChangePasswordProps = {
    currentPassword: string;
    password: string;
};

export const Profile = () => {
    const { state: user, update: setUser } = useContext(PrivateUserContext);
    const [, , removeCookie] = useTypedCookies();
    const { update: updateError } = useContext(ErrorContext);

    const changePassword = async ({ currentPassword, password }: ChangePasswordProps) =>
        user &&
        Api.login({ username: user.username, password: currentPassword }).then(() =>
            Api.patchMe({ password })
        );

    const deleteAccount = () =>
        Api.deleteMe()
            .then(() => removeCookie(Cookies.Session))
            .catch(err => updateError(new ErrorMsg(err.message)));

    let content;
    if (user) {
        const { todoLists, ...userData } = user;
        content = (
            <>
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
                        Your account will be deleted permanently. All your data will be lost
                        instantly!
                        <Button variant="outline-danger" onClick={deleteAccount}>
                            Delete my account
                        </Button>
                    </div>
                </Alert>
            </>
        );
    }

    return (
        <main>
            <h1>Your Profile</h1>
            {content}
        </main>
    );
};
