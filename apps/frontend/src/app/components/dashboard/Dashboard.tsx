import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { TodoListSidebar } from "../todolist_sidebar/TodoListSidebar";
import "./Dashboard.scss";

export const Dashboard = () => {
    const user = useContext(UserContext);

    return (
        <div className={"d-flex"}>
            <TodoListSidebar />
            <main>
                <h1>Hello {user?.forename || `@${user?.username}`}</h1>
                <p>This is your personal dashboard.</p>
            </main>
            <aside className={"aside-placeholder"} />
        </div>
    );
};
