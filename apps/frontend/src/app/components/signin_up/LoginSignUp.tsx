import { ValidatedForm, ValidatedFormProps } from "../validated_form/ValidatedForm";
import { Stack } from "react-bootstrap";
import Rocket from "../../../assets/imgs/rocket.svg";

type LoginSignUpProps<T extends object> = ValidatedFormProps<T> & {
    title: string;
    motivationText: JSX.Element;
};

export function LoginSignUp<T extends object>({
    title,
    motivationText,
    ...formProps
}: LoginSignUpProps<T>) {
    return (
        <main>
            <h1>{title}</h1>
            <Stack gap={5} direction="horizontal">
                <ValidatedForm {...formProps} />
                <div className={"text-center m-auto d-grid"}>
                    <img
                        className={"ms-auto me-auto mb-2 w-20"}
                        src={Rocket}
                        alt={"Motivational rocket"}
                    />
                    <h3>{motivationText}</h3>
                </div>
            </Stack>
        </main>
    );
}
