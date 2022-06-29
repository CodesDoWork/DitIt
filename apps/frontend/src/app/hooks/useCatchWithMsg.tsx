import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";

type CatchFunction = (promise: Promise<unknown>) => void;

export const useCatchWithMsg = (): CatchFunction => {
    const { update: setError } = useContext(ErrorContext);

    return promise => promise.catch(err => setError(err.message));
};
