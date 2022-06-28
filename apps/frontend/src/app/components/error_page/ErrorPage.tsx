import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Alert, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ErrorPage.scss";
import { appName } from "../../constants";

type ErrorPageProps = {
    status: StatusCodes;
};

export const ErrorPage = ({ status }: ErrorPageProps) => {
    const reason = getReasonPhrase(status);
    document.title = `${reason} - ${appName}`;
    return (
        <main>
            <Alert variant={"danger"}>
                <Alert.Heading className={"mb-4 text-center"}>
                    {status} - {reason}
                </Alert.Heading>
                <Stack gap={3}>
                    <Button variant={"outline-danger"} onClick={() => history.back()}>
                        Back to last page
                    </Button>
                    <Link to="/">
                        <Button variant={"outline-danger"}>To home page</Button>
                    </Link>
                </Stack>
            </Alert>
        </main>
    );
};
