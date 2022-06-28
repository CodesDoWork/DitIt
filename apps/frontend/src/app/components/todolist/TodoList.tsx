import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router";
import { StatusCodes } from "http-status-codes";
import { ErrorPage } from "../error_page/ErrorPage";
import { TodoListSidebar } from "../todolist_sidebar/TodoListSidebar";
import { Accordion, Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import "./TodoList.scss";
import { FormModal } from "../form_modal/FormModal";
import { CreateTodoDto, PatchTodoListDto, TodoDto } from "@todo-app/types";
import { Priorities, Priority, SortMode } from "@todo-app/types-enums";
import {
    deadlineInput,
    descriptionInput,
    nameInput,
    priorityInput,
} from "../validated_form/form-inputs";
import { Api } from "../../api/Api";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Todo } from "../todo/Todo";
import { ErrorContext, ErrorMsg } from "../../contexts/ErrorContext";
import { useNavigate } from "react-router-dom";
import { SubmitModal } from "../submit_modal/SubmitModal";
import { ObjectID } from "typeorm";

export const TodoList = () => {
    const user = useContext(UserContext);
    const { name: paramListName } = useParams();
    const { update: setError } = useContext(ErrorContext);
    const [showNewTodoModal, setShowNewTodoModal] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [listName, setListName] = useState<string>("");
    const [sortMode, setSortMode] = useState<SortMode | undefined>(undefined);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const list = user?.todoLists.find(todolist => todolist.name === paramListName);
    const [todos, setTodos] = useState<TodoDto[]>([]);
    useEffect(() => {
        setTodos(list?.todos || []);
        list && setSortMode(list.sortMode);
    }, [list]);
    const onTodoChange = (todo: TodoDto) => {
        if (list) {
            const newTodos = Array.from(todos);
            newTodos[todos.findIndex(item => item === todo)] = todo;
            setTodos(newTodos);
        }
    };
    const onTodoDelete = (todo: TodoDto) => list && setTodos(todos.filter(item => item !== todo));

    const patchTodoList = (data: PatchTodoListDto) =>
        list &&
        user &&
        Api.patchList(list._id, user, data)
            .then(newList => navigate(`/lists/${newList.name}`))
            .catch(err => setError(new ErrorMsg(err.message)));

    useEffect(() => {
        if (list && sortMode !== list.sortMode) {
            patchTodoList({ sortMode });
        }
    }, [sortMode]);

    if (!user) {
        return <main />;
    }

    if (!list) {
        return <ErrorPage status={StatusCodes.NOT_FOUND} />;
    }

    const createTodo = async (data: Omit<CreateTodoDto, "listId">) =>
        Api.createTodo(list, { ...data, listId: list._id.toString() })
            .then(() => setShowNewTodoModal(false))
            .catch(err => setError(new ErrorMsg(err.message)));

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const draggedTodo = todos.find(todo => todo._id.toString() === draggableId);
        if (!draggedTodo) {
            return;
        }

        setSortMode(SortMode.Manual);

        const newTodos = Array.from(todos);
        newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, draggedTodo);
        newTodos.forEach((todo, idx) => {
            todo.manualSortIndex = idx;
            Api.patchTodo(todo._id, { manualSortIndex: idx }).catch(err =>
                setError(new ErrorMsg(err.message))
            );
        });
        setTodos(newTodos);
    };

    const toggleNameEditMode = () => {
        if (isEditingName) {
            if (!listName) {
                return;
            }

            if (listName !== list.name) {
                patchTodoList({ name: listName, sortMode });
            }
        } else {
            setListName(list.name);
        }

        setIsEditingName(!isEditingName);
    };

    const deleteList = () =>
        Api.deleteList(list._id, user)
            .then(() => {
                navigate("/dashboard");
                setShowDeleteModal(false);
            })
            .catch(err => setError(new ErrorMsg(err.message)));

    const headline = isEditingName ? (
        <Form.Control
            className={"mb-5 mt-2"}
            onBlur={toggleNameEditMode}
            value={listName}
            onChange={e => setListName(e.target.value)}
        />
    ) : (
        <h1 onDoubleClick={toggleNameEditMode}>{list.name}</h1>
    );

    const sortByCreation = () =>
        todos.sort((t1, t2) =>
            (t1._id as ObjectID).generationTime > (t2._id as ObjectID).generationTime ? 1 : -1
        );

    const sortAlphabetic = () => todos.sort((t1, t2) => t1.name.localeCompare(t2.name));

    const sortByPriority = () =>
        todos.sort((t1, t2) =>
            Priorities[t1.priority || Priority.None] > Priorities[t2.priority || Priority.None]
                ? 1
                : -1
        );

    const sortByDeadline = () =>
        todos.sort((t1, t2) =>
            (new Date(t1.deadline?.toString() || 0).getTime() || 0) >
            (new Date(t2.deadline?.toString() || 0).getTime() || 0)
                ? 1
                : -1
        );

    const sortedTodos = (): TodoDto[] => {
        switch (list.sortMode) {
            case SortMode.ByCreationAsc:
                return sortByCreation();
            case SortMode.ByCreationDesc:
                return sortByCreation().reverse();

            case SortMode.AlphabeticAsc:
                return sortAlphabetic();
            case SortMode.AlphabeticDesc:
                return sortAlphabetic().reverse();

            case SortMode.ByPriorityAsc:
                return sortByPriority();
            case SortMode.ByPriorityDesc:
                return sortByPriority().reverse();

            case SortMode.ByDeadlineAsc:
                return sortByDeadline();
            case SortMode.ByDeadlineDesc:
                return sortByDeadline().reverse();

            default:
                return todos.sort((t1, t2) =>
                    (t1.manualSortIndex || 0) > (t2.manualSortIndex || 0) ? 1 : -1
                );
        }
    };

    return (
        <div className={"d-flex"}>
            <TodoListSidebar />
            <main>
                {headline}
                <div className={"d-flex justify-content-between align-items-end mb-3"}>
                    {todos.filter(item => item.done).length}/{todos.length} Todos done
                    <div>
                        <Button
                            className={"w-100"}
                            onClick={() => setShowNewTodoModal(true)}
                            variant={"primary"}>
                            New Todo
                        </Button>
                        <InputGroup className={"mt-3 mb-0"}>
                            <FloatingLabel label={"Sort"}>
                                <Form.Select
                                    value={sortMode}
                                    onChange={e => setSortMode(e.target.value as SortMode)}>
                                    {Object.values<string>(SortMode).map(value => (
                                        <option value={value}>{value}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </InputGroup>
                    </div>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={"list"}>
                        {provided => (
                            <Accordion
                                alwaysOpen
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {sortedTodos().map((todo, idx) => (
                                    <Todo
                                        list={list}
                                        todo={todo}
                                        key={todo._id.toString()}
                                        idx={idx}
                                        onChange={onTodoChange}
                                        onDelete={onTodoDelete}
                                    />
                                ))}
                                {provided.placeholder}
                            </Accordion>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className={"mt-5 d-flex justify-content-end"}>
                    <Button onClick={() => setShowDeleteModal(true)} variant={"outline-danger"}>
                        Delete
                    </Button>
                </div>
            </main>
            <aside className={"aside-placeholder"} />

            <FormModal
                submitText={"Create"}
                inputs={[nameInput, descriptionInput, priorityInput, deadlineInput]}
                onSubmit={createTodo}
                show={showNewTodoModal}
                onHide={() => setShowNewTodoModal(false)}
                title={"Create Todo"}
                msg={"Specify the details for your Todo:"}
            />
            <SubmitModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                msg={"Do you really want to delete this Todo-List?"}
                onSubmit={deleteList}
            />
        </div>
    );
};
