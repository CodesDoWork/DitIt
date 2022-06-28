import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { FormEvent, useContext, useState } from "react";
import "./ValidatedForm.scss";
import pluralize from "pluralize";
import { escapeRegex } from "../../utils";
import { ErrorContext, ErrorMsg } from "../../contexts/ErrorContext";

export type ValidatedFormInputProps = {
    label: string;
    name: string;
    type: string;
    errorText: string;
    required?: boolean;
    withConfirmation?: boolean;
    prefilledValue?: string | number | null;
    options?: [string, string | number][];
};

export type ValidatedFormProps<T extends object> = {
    className?: string;
    submitText: string;
    inputs: ValidatedFormInputProps[];
    onSubmit: (data: T) => Promise<unknown>;
    prefilledData?: Record<string, string | number | null>;
};

export function ValidatedForm<T extends object>({
    className,
    submitText,
    inputs,
    onSubmit,
    prefilledData,
}: ValidatedFormProps<T>) {
    const [validated, setValidated] = useState(false);
    const { update: updateError } = useContext(ErrorContext);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        updateError(undefined);

        const getInput = <S extends HTMLInputElement | RadioNodeList>(name: string): S =>
            event.target[name as keyof EventTarget] as unknown as S;

        const getValue = ({ name, withConfirmation }: ValidatedFormInputProps) =>
            (withConfirmation
                ? (getInput<RadioNodeList>(name)[0] as HTMLInputElement)
                : getInput(name)
            ).value;

        const data = inputs.reduce(
            (all, props) => ({ ...all, [props.name]: getValue(props) }),
            {}
        ) as T;

        const form = event.currentTarget as HTMLFormElement;
        if (form.checkValidity()) {
            onSubmit(data).catch(err => updateError(new ErrorMsg(err.message)));
        }

        setValidated(true);
    };

    return (
        <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className={`validated-form ${className}`}>
            {inputs.map(input => (
                <ValidatedFormInput
                    {...input}
                    prefilledValue={prefilledData ? prefilledData[input.name] : undefined}
                />
            ))}
            <Button variant="outline-primary" size="lg" type={"submit"}>
                {submitText}
            </Button>
        </Form>
    );
}

const ValidatedFormInput = ({
    label,
    errorText,
    withConfirmation,
    prefilledValue,
    ...props
}: ValidatedFormInputProps) => {
    const [value, setValue] = useState(prefilledValue || undefined);
    const [confirmationValue, setConfirmationValue] = useState("");
    const isArea = props.type === "textarea";

    const confirmation = withConfirmation ? (
        <InputGroup hasValidation>
            <FloatingLabel label={`Confirm ${label}`}>
                <Form.Control
                    value={confirmationValue}
                    onChange={e => setConfirmationValue(e.target.value)}
                    pattern={escapeRegex(value?.toString() || "")}
                    {...props}
                />
                <Form.Control.Feedback type="invalid">
                    {confirmationValue
                        ? `${pluralize(label)} don't match!`
                        : `Please confirm your ${label}.`}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Looks good</Form.Control.Feedback>
            </FloatingLabel>
        </InputGroup>
    ) : undefined;

    const input = props.options ? (
        <Form.Select {...props} value={value} onChange={e => setValue(e.target.value)}>
            {props.options.map(([key, option]) => (
                <option value={option}>{key}</option>
            ))}
        </Form.Select>
    ) : (
        <Form.Control
            as={isArea ? "textarea" : undefined}
            rows={isArea ? 3 : undefined}
            value={value}
            onChange={e => setValue(e.target.value)}
            {...props}
        />
    );

    return (
        <>
            <InputGroup hasValidation>
                <FloatingLabel label={label}>
                    {input}
                    <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>
                </FloatingLabel>
            </InputGroup>
            {confirmation}
        </>
    );
};
