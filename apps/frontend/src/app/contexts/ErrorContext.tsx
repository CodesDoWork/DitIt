import { createCtx } from "./createContext";

export class ErrorMsg {
    constructor(readonly msg: string, readonly type = "Error") {}
}

export const [ErrorContext, ErrorProvider] = createCtx<ErrorMsg | undefined>(undefined);
