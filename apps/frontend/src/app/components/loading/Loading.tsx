import { Spinner } from "react-bootstrap";

export const Loading = () => (
    <main className={"d-flex align-item-center justify-content-center"}>
        <Spinner animation="border" />
        <h5 className={"ms-3"}>Loading...</h5>
    </main>
);
