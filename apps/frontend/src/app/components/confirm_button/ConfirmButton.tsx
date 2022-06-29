import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { ButtonProps } from "react-bootstrap/Button";

type ConfirmButtonProps = ButtonProps &
    React.PropsWithChildren<{
        title: string;
        msg: string;
        onConfirm: () => void;
        variant?: string;
        modalVariant?: string;
    }>;

export const ConfirmButton = ({
    title,
    msg,
    onConfirm,
    variant,
    modalVariant,
    children,
}: ConfirmButtonProps) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Button variant={variant} onClick={() => setShowModal(true)}>
                {children}
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{msg}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)} variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} variant={modalVariant || "danger"}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
