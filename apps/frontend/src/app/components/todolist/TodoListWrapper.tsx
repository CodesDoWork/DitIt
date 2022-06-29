import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router";
import { ErrorPage } from "../error_page/ErrorPage";
import { StatusCodes } from "http-status-codes";
import { TodoList } from "./TodoList";

export const TodoListWrapper = () => {
    // can't be null because of routing in app.tsx
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = useContext(UserContext)!; //NOSONAR
    const { name: paramListName } = useParams();
    const list = user.todoLists.find(todolist => todolist.name === paramListName);

    return list ? <TodoList list={list} /> : <ErrorPage status={StatusCodes.NOT_FOUND} />;
};
