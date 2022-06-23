import { Injectable } from "@nestjs/common";
import { CreateTodoDto, PatchTodoDto } from "@todo-app/types";
import { Todo } from "./todo.entity";
import { TodoListsService } from "../todolists/todolist.service";
import { CommonService } from "../common/common.service";

@Injectable()
export class TodoService extends CommonService<Todo, CreateTodoDto, PatchTodoDto> {
    constructor(private readonly todoListService: TodoListsService) {
        super(Todo);
    }

    processCreationDto = async ({
        list,
        description,
        priority,
        deadline,
        ...data
    }: CreateTodoDto) => ({
        ...data,
        description: description || null,
        priority: priority || null,
        deadline: deadline || null,
        list: await this.todoListService.findOne(list),
    });
}
