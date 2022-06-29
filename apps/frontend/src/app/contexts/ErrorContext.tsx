import { createCtx } from "./createContext";

export const [ErrorContext, ErrorProvider] = createCtx<string | undefined>(undefined);
