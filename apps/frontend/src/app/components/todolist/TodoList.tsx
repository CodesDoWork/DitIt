import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { TodoListSidebar } from "../todolist_sidebar/TodoListSidebar";
import { Accordion, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { CreateTodoDto, PatchTodoListDto, TodoDto, TodoListDto } from "@todo-app/types";
import { SortMode } from "@todo-app/types-enums";
import {
    deadlineInput,
    descriptionInput,
    nameInput,
    priorityInput,
} from "../validated_form/form-inputs";
import { Api } from "../../api/Api";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Todo } from "../todo/Todo";
import { useNavigate } from "react-router-dom";
import { ConfirmButton } from "../confirm_button/ConfirmButton";
import { useCatchWithMsg } from "../../hooks/useCatchWithMsg";
import { sortedTodos } from "./sort";
import { FormButton } from "../form_button/FormButton";

type TodoListProps = {
    list: TodoListDto;
};

export const TodoList = ({ list }: TodoListProps) => {
    // can't be null because of routing in app.tsx
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = useContext(UserContext)!; //NOSONAR
    const catchWithMsg = useCatchWithMsg();
    const navigate = useNavigate();

    const [isEditingName, setIsEditingName] = useState(false);
    const [listName, setListName] = useState<string>("");
    const [sortMode, setSortMode] = useState<SortMode>(list.sortMode);
    const [todos, setTodos] = useState<TodoDto[]>(list.todos);

    const patchList = (data: PatchTodoListDto) =>
        catchWithMsg(
            Api.patchList(list._id, user, data).then(newList => navigate(`/lists/${newList.name}`))
        );
    const deleteList = () =>
        catchWithMsg(Api.deleteList(list._id, user).then(() => navigate("/dashboard")));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => patchList({ sortMode }), [sortMode]);
    useEffect(() => {
        setTodos(list.todos);
        setSortMode(list.sortMode);
    }, [list]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        const draggedTodo = todos.find(todo => todo._id.toString() === draggableId);
        if (!destination || !draggedTodo || destination.index === source.index) {
            return;
        }

        const newTodos = sortedTodos(todos, sortMode);
        newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, draggedTodo);
        newTodos.forEach((todo, idx) => {
            todo.manualSortIndex = idx;
            catchWithMsg(Api.patchTodo(todo._id, { manualSortIndex: idx }));
        });

        setTodos(newTodos);
        setSortMode(SortMode.Manual);
    };

    const createTodo = async (data: Omit<CreateTodoDto, "listId">) =>
        Api.createTodo(list, { ...data, listId: list._id.toString() }).then(() =>
            setTodos([...todos])
        );
    const onTodoChange = (todo: TodoDto) => {
        const newTodos = Array.from(todos);
        newTodos[todos.findIndex(item => item === todo)] = todo;
        setTodos(newTodos);
    };
    const onTodoDelete = (todo: TodoDto) => setTodos(todos.filter(item => item !== todo));

    const toggleNameEditMode = () => {
        if (isEditingName) {
            if (!listName) {
                // don't save
                return;
            }

            if (listName !== list.name) {
                patchList({ name: listName, sortMode });
            }
        } else {
            setListName(list.name);
        }

        setIsEditingName(!isEditingName);
    };

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

    return (
        <div className={"d-flex"}>
            <TodoListSidebar user={user} />
            <main>
                {headline}
                <div className={"d-flex justify-content-between align-items-end mb-3"}>
                    {todos.filter(item => item.done).length}/{todos.length} Todos done
                    <div>
                        <FormButton
                            className={"w-100"}
                            submitText={"Create"}
                            inputs={[nameInput, descriptionInput, priorityInput, deadlineInput]}
                            onSubmit={createTodo}
                            title={"Create Todo"}
                            msg={"Specify the details for your Todo:"}>
                            New Todo
                        </FormButton>
                        <InputGroup className={"mt-3 mb-0"}>
                            <FloatingLabel label={"Sort"}>
                                <Form.Select
                                    value={sortMode}
                                    onChange={e => setSortMode(e.target.value as SortMode)}>
                                    {Object.values<string>(SortMode).map(value => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
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
                                {sortedTodos(todos, sortMode).map((todo, idx) => (
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
                    <ConfirmButton
                        variant={"outline-danger"}
                        modalVariant={"danger"}
                        title={"Delete Todo-List"}
                        msg={"Do you really want to delete this Todo-List?"}
                        onConfirm={deleteList}>
                        Delete
                    </ConfirmButton>
                </div>
            </main>
            <aside className={"aside-placeholder"} />
        </div>
    );
};
