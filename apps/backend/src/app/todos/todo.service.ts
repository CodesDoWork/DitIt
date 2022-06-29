import { Injectable } from "@nestjs/common";
import { CreateTodoDto, PatchTodoDto } from "@todo-app/types";
import { Todo } from "./todo.entity";
import { CommonService } from "../common/common.service";
import { ObjectID } from "mongodb";
import { TodoList } from "../todolists/todolist.entity";

@Injectable()
export class TodoService extends CommonService<Todo, CreateTodoDto, PatchTodoDto> {
    constructor() {
        super(Todo, "todo");
    }

    processCreationDto = async ({
        listId,
        description,
        priority,
        deadline,
        ...data
    }: CreateTodoDto) => {
        const _id = new ObjectID(listId);
        const list = await TodoList.findOneBy({ _id });

        return {
            ...data,
            description: description || null,
            priority: priority || null,
            deadline: deadline || null,
            done: false,
            manualSortIndex: list.todos.length,
            listId: _id,
        };
    };

    postCreate = async (item: Todo) => {
        await TodoList.findOneBy({ _id: item.listId }).then(list => {
            list.todos.push(item);
            return list.save();
        });

        return item;
    };

    toggleDone = async (id: Todo | ObjectID | string): Promise<Todo> =>
        this.getEntity(id).then(todo => Todo.merge(todo, { done: !todo.done }).save());
}
