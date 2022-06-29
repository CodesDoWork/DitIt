import { useState } from "react";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { escapeRegex } from "../../utils";
import pluralize from "pluralize";

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

export const ValidatedFormInput = ({
    label,
    errorText,
    withConfirmation,
    prefilledValue,
    options,
    ...props
}: ValidatedFormInputProps) => {
    const [value, setValue] = useState(prefilledValue || "");
    const [confirmationValue, setConfirmationValue] = useState("");

    const isArea = props.type === "textarea";
    const confirmation = withConfirmation ? (
        <InputGroup hasValidation>
            <FloatingLabel label={`Confirm ${label}`}>
                <Form.Control
                    {...props}
                    value={confirmationValue}
                    onChange={e => setConfirmationValue(e.target.value)}
                    pattern={escapeRegex(value?.toString() || "")}
                    name={`confirm_${props.name}`}
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

    const input = options ? (
        <Form.Select {...props} value={value} onChange={e => setValue(e.target.value)}>
            {options.map(([key, option]) => (
                <option key={option} value={option}>
                    {key}
                </option>
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
