// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

export function createCtx<A>(defaultValue: A) {
    type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
    const defaultUpdate: UpdateType = () => defaultValue;
    const ctx = createContext({
        state: defaultValue,
        update: defaultUpdate,
    });

    function Provider(props: PropsWithChildren<Record<string, unknown>>) {
        const [state, update] = useState(defaultValue);
        return <ctx.Provider value={{ state, update }} {...props} />;
    }

    return [ctx, Provider] as const;
}
