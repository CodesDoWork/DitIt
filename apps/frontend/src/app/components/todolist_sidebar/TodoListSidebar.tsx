import { Badge, ListGroup } from "react-bootstrap";
import { todolistName } from "../validated_form/form-inputs";
import AddIcon from "../../../assets/imgs/add.svg";
import { useContext, useState } from "react";
import { TodoListDto } from "@todo-app/types";
import { Api } from "../../api/Api";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import "./TodoListSidebar.scss";
import { FormModal } from "../form_modal/FormModal";

export const TodoListSidebar = () => {
    const user = useContext(UserContext);
    const [showNewListModal, setShowNewListModal] = useState(false);

    const createList = async (list: TodoListDto) =>
        user && Api.createList(user, list).then(() => setShowNewListModal(false));

    return (
        <>
            <aside>
                <h3>Your Todo-Lists</h3>
                <ListGroup variant={"flush"}>
                    {user?.todoLists.map(toList)}
                    <ListGroup.Item
                        action
                        className="d-flex align-items-center"
                        onClick={() => setShowNewListModal(true)}>
                        <img className="me-2" src={AddIcon} alt="" />
                        Create a new list
                    </ListGroup.Item>
                </ListGroup>
            </aside>
            <FormModal
                submitText={"Create"}
                inputs={[todolistName]}
                onSubmit={createList}
                show={showNewListModal}
                onHide={() => setShowNewListModal(false)}
                title={"Create Todo-List"}
                msg={"Enter a name for your list:"}
            />
        </>
    );
};

const toList = (list: TodoListDto) => (
    <ListGroup.Item action>
        <Link
            to={`/lists/${list.name}`}
            className="d-flex justify-content-between align-items-center text-decoration-none">
            <div className="ms-2 me-auto">
                <b className={"list-name"}>{list.name}</b>
            </div>
            <Badge bg="primary" pill>
                {list.todos.filter(todo => !todo.done).length}
            </Badge>
        </Link>
    </ListGroup.Item>
);
