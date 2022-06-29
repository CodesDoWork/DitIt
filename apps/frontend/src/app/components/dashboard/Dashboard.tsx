import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { TodoListSidebar } from "../todolist_sidebar/TodoListSidebar";

export const Dashboard = () => {
    // can't be null because of routing in app.tsx
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = useContext(UserContext)!; //NOSONAR

    return (
        <div className={"d-flex"}>
            <TodoListSidebar user={user} />
            <main>
                <h1>Hello {user.forename || `@${user.username}`}</h1>
                <p>This is your personal dashboard.</p>
            </main>
            <aside className={"aside-placeholder"} />
        </div>
    );
};
