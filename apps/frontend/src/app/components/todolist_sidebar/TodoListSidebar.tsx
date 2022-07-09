import { Badge, ListGroup } from "react-bootstrap";
import { todolistName } from "../validated_form/form-inputs";
import AddIcon from "../../../assets/imgs/add.svg";
import { TodoListDto, UserDto } from "@todo-app/types";
import { Api } from "../../api/Api";
import { Link } from "react-router-dom";
import "./TodoListSidebar.scss";
import { FormButton } from "../form_button/FormButton";
import { useState } from "react";

type TodoListSidebarProps = {
    user: UserDto;
};

export const TodoListSidebar = ({ user }: TodoListSidebarProps) => {
    const [lists, setLists] = useState(user.todoLists);
    const createList = async (list: TodoListDto) =>
        Api.createList(user, list).then(newList =>
            setLists(Array.from(new Set([...lists, newList])))
        );

    return (
        <aside>
            <h3>Your Todo-Lists</h3>
            <ListGroup variant={"flush"}>
                {lists.map(toListEntry)}
                <FormButton
                    className={
                        "w-100 p-3 ps-4 d-flex align-items-center list-group-item list-group-item-action"
                    }
                    variant={"link"}
                    submitText={"Create"}
                    inputs={[todolistName]}
                    onSubmit={createList}
                    title={"Create Todo-List"}
                    msg={"Enter a name for your list:"}>
                    <img className="me-2" src={AddIcon} alt="" />
                    Create a new list
                </FormButton>
            </ListGroup>
        </aside>
    );
};

const toListEntry = (list: TodoListDto, idx: number) => (
    <ListGroup.Item action key={idx}>
        <Link
            to={`/lists/${list.name}`}
            className="d-flex justify-content-between align-items-center text-decoration-none">
            <span className={"list-name ms-2 me-auto"}>{list.name}</span>
            <Badge bg="primary" pill>
                {list.todos.filter(todo => !todo.done).length}
            </Badge>
        </Link>
    </ListGroup.Item>
);
