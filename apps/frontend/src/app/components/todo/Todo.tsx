import { useState } from "react";
import { Accordion, Button, Card, Form, Stack, useAccordionButton } from "react-bootstrap";
import { Api } from "../../api/Api";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "../../../assets/imgs/pencil.svg";
import ExpandLessIcon from "../../../assets/imgs/expand_less.svg";
import ExpandMoreIcon from "../../../assets/imgs/expand_more.svg";
import DeleteIcon from "../../../assets/imgs/trash.svg";
import { PatchTodoDto, TodoDto, TodoListDto } from "@todo-app/types";
import {
    deadlineInput,
    descriptionInput,
    nameInput,
    priorityInput,
} from "../validated_form/form-inputs";
import { LabelledText } from "../laballed_text/LabelledText";
import { Priority } from "@todo-app/types-enums";
import "./Todo.scss";
import { useCatchWithMsg } from "../../hooks/useCatchWithMsg";
import { ConfirmButton } from "../confirm_button/ConfirmButton";
import { FormButton } from "../form_button/FormButton";

type TodoProps = {
    list: TodoListDto;
    todo: TodoDto;
    idx: number;
    onChange: (todo: TodoDto) => void;
    onDelete: (todo: TodoDto) => void;
};

export const Todo = ({ todo, idx, onChange, list, onDelete }: TodoProps) => {
    const id = todo._id.toString();
    const [isExpanded, setExpanded] = useState(false);
    const toggleExpansion = useAccordionButton(id, () => setExpanded(!isExpanded));
    const catchWithMsg = useCatchWithMsg();

    const toggleDone = () => catchWithMsg(Api.toggleDone(todo).then(onChange));
    const editTodo = (data: PatchTodoDto) => Api.patchTodo(todo._id, data, list).then(onChange);
    const deleteTodo = () => Api.deleteTodo(todo._id, list).then(() => onDelete(todo));

    return (
        <Draggable draggableId={id} index={idx}>
            {provided => (
                <div
                    className={"todo"}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <Card>
                        <Card.Header className={"d-flex align-items-center"}>
                            <Form.Check
                                checked={todo.done}
                                onChange={toggleDone}
                                className={"done me-2"}
                                type={"checkbox"}
                            />
                            <span className={"todo-name"}>{todo.name}</span>
                            <Stack direction={"horizontal"} gap={3}>
                                <FormButton
                                    variant={"link"}
                                    submitText={"Edit"}
                                    inputs={[
                                        nameInput,
                                        descriptionInput,
                                        priorityInput,
                                        deadlineInput,
                                    ]}
                                    onSubmit={editTodo}
                                    title={"Edit Todo"}
                                    msg={"Specify the details for your Todo:"}
                                    prefilledData={
                                        {
                                            name: todo.name,
                                            description: todo.description,
                                            priority: todo.priority || 0,
                                            deadline: todo.deadline?.toString(),
                                        } as Record<string, string | number | null>
                                    }>
                                    <img src={EditIcon} alt={""} />
                                </FormButton>
                                <ConfirmButton
                                    variant={"link"}
                                    modalVariant={"danger"}
                                    onConfirm={deleteTodo}
                                    title={"Delete Todo"}
                                    msg={"Do you really want to delete this todo?"}>
                                    <img src={DeleteIcon} alt={""} />
                                </ConfirmButton>
                                <Button variant={"link"} onClick={toggleExpansion}>
                                    <img
                                        src={isExpanded ? ExpandLessIcon : ExpandMoreIcon}
                                        alt={""}
                                    />
                                </Button>
                            </Stack>
                        </Card.Header>
                        <Accordion.Collapse eventKey={id}>
                            <div className={"ps-3 pe-3 pt-3"}>
                                <LabelledText
                                    label={"Description"}
                                    text={todo.description || "-"}
                                />
                                <LabelledText
                                    label={"Priority"}
                                    text={(todo.priority || Priority.None) as string}
                                />
                                <LabelledText
                                    label={"Deadline"}
                                    text={todo.deadline?.toString() || "-"}
                                />
                            </div>
                        </Accordion.Collapse>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};
