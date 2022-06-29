import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ValidatedForm, ValidatedFormProps } from "../validated_form/ValidatedForm";

type FormButtonProps<T extends object> = ValidatedFormProps<T> &
    React.PropsWithChildren<{
        className?: string;
        variant?: string;
        title: string;
        msg: string;
    }>;

export function FormButton<T extends object>({
    className,
    variant,
    children,
    title,
    msg,
    onSubmit,
    ...props
}: FormButtonProps<T>) {
    const [showModal, setShowModal] = useState(false);

    const submit = (data: T) => {
        setShowModal(false);
        return onSubmit(data);
    };

    return (
        <>
            <Button className={className} variant={variant} onClick={() => setShowModal(true)}>
                {children}
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {msg}
                    <ValidatedForm className="mt-2 ms-auto me-auto" {...props} onSubmit={submit} />
                </Modal.Body>
            </Modal>
        </>
    );
}
