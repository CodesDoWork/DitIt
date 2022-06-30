import "./ErrorToast.scss";
import { Toast, ToastContainer } from "react-bootstrap";
import ErrorIcon from "../../../assets/imgs/error.svg";
import { useContext } from "react";
import { ErrorContext } from "../../contexts/ErrorContext";
import { ToastProps } from "react-bootstrap/Toast";
import { useElementSize, useWindowSize } from "usehooks-ts";
import { useScrollYPosition } from "react-use-scroll-position";

export const ErrorToast = (props: ToastProps) => {
    const { state: err, update: setErr } = useContext(ErrorContext);
    const { height } = useWindowSize();
    const [toastRef, { height: toastHeight }] = useElementSize();
    const scrollY = useScrollYPosition();

    return (
        <ToastContainer position={"top-start"}>
            <Toast
                ref={toastRef}
                style={{ marginTop: height - toastHeight - 32 + scrollY }}
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
