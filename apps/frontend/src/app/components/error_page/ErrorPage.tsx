import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Alert, Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { appName } from "../../constants";

type ErrorPageProps = {
    status: StatusCodes;
};

export const ErrorPage = ({ status }: ErrorPageProps) => {
    const navigate = useNavigate();
    const reason = getReasonPhrase(status);
    document.title = `${reason} - ${appName}`;

    return (
        <main>
            <Alert variant={"danger"}>
                <Alert.Heading className={"mb-4 text-center"}>
                    {status} - {reason}
                </Alert.Heading>
                <Stack gap={3} className={"align-items-center"}>
                    <Button
                        className={"w-50"}
                        variant={"outline-danger"}
                        onClick={() => navigate(-1)}>
                        Back to last page
                    </Button>
                    <Link className={"w-50"} to="/">
                        <Button className={"w-100"} variant={"outline-danger"}>
                            To home page
                        </Button>
                    </Link>
                </Stack>
            </Alert>
        </main>
    );
};
