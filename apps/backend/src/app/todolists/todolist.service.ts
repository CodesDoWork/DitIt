import { Injectable } from "@nestjs/common";
import { PatchTodoListDto, SortMode } from "@todo-app/types";
import { TodoList } from "./todolist.entity";
import { CommonService } from "../common/common.service";
import { CreateTodoList } from "./types";

@Injectable()
export class TodoListsService extends CommonService<TodoList, CreateTodoList, PatchTodoListDto> {
    constructor() {
        super(TodoList);
    }

    processCreationDto = async (data: CreateTodoList) => ({
        ...data,
        sortMode: SortMode.ByCreationDesc,
        todos: [],
    });
}
