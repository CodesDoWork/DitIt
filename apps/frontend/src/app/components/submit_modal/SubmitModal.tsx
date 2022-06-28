import { Button, Modal } from "react-bootstrap";

type SubmitModalProps = {
    show: boolean;
    onHide: () => void;
    msg: string;
    onSubmit: () => void;
    variant?: string;
};

export const SubmitModal = ({ msg, onSubmit, variant, ...props }: SubmitModalProps) => (
    <Modal {...props}>
        <Modal.Header closeButton>
            <Modal.Title>Delete Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg}</Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide} variant="secondary">
                Cancel
            </Button>
            <Button onClick={onSubmit} variant={variant || "danger"}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
);
