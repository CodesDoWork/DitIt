import { ValidatedForm, ValidatedFormProps } from "../validated_form/ValidatedForm";
import { Modal } from "react-bootstrap";

type FormModalProps<T extends object> = ValidatedFormProps<T> & {
    show: boolean;
    onHide: () => void;
    title: string;
    msg: string;
};

export function FormModal<T extends object>({ title, msg, ...props }: FormModalProps<T>) {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {msg}
                <ValidatedForm className="mt-2 ms-auto me-auto" {...props} />
            </Modal.Body>
        </Modal>
    );
}
