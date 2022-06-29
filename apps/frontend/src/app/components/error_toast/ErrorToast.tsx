import "./ErrorToast.scss";
import { Toast, ToastContainer } from "react-bootstrap";
import ErrorIcon from "../../../assets/imgs/error.svg";
import { useContext } from "react";
import { ErrorContext } from "../../contexts/ErrorContext";
import { ToastProps } from "react-bootstrap/Toast";

export const ErrorToast = (props: ToastProps) => {
    const { state: err, update: setErr } = useContext(ErrorContext);

    return (
        <ToastContainer position={"bottom-start"}>
            <Toast
                onClose={() => setErr(undefined)}
                show={!!err}
                animation={true}
                bg={"danger"}
                {...props}>
                <Toast.Header>
                    <img src={ErrorIcon} className="me-2" alt="" />
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body className={"text-white"}>{err}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};
