import { Button, Form } from "react-bootstrap";
import { FormEvent, useContext, useState } from "react";
import "./ValidatedForm.scss";
import { useCatchWithMsg } from "../../hooks/useCatchWithMsg";
import { ErrorContext } from "../../contexts/ErrorContext";
import { ValidatedFormInput, ValidatedFormInputProps } from "./ValidatedFormInput";

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
    const { update: setError } = useContext(ErrorContext);
    const catchWithMsg = useCatchWithMsg();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setError(undefined);

        const data = inputs.reduce((all, { name, required }) => {
            let value: string | null = (
                event.target[name as keyof EventTarget] as unknown as HTMLInputElement
            ).value;
            if (!required && value === "") {
                value = null;
            }

            return {
                ...all,
                [name]: value,
            };
        }, {}) as T;

        const form = event.currentTarget as HTMLFormElement;
        form.checkValidity() && catchWithMsg(onSubmit(data));
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
                    key={input.name}
                    {...input}
                    prefilledValue={prefilledData ? prefilledData[input.name] : undefined}
                />
            ))}
            <Button className={"w-100"} variant="outline-primary" size="lg" type={"submit"}>
                {submitText}
            </Button>
        </Form>
    );
}
