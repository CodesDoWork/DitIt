import { BadRequestException, Injectable } from "@nestjs/common";
import { PatchTodoListDto, SortMode } from "@todo-app/types";
import { TodoList } from "./todolist.entity";
import { CommonService } from "../common/common.service";
import { CreateTodoList } from "./types";
import { User } from "../users/user.entity";

@Injectable()
export class TodoListsService extends CommonService<TodoList, CreateTodoList, PatchTodoListDto> {
    constructor() {
        super(TodoList, "todolist");
    }

    processCreationDto = async ({ user, ...data }: CreateTodoList) => {
        if (user.todoLists.find(list => list.name === data.name)) {
            throw new BadRequestException("You already have a list with this name!");
        }

        return {
            ...data,
            userId: user._id,
            sortMode: SortMode.ByCreationDesc,
        };
    };

    postCreate = async (item: TodoList) => {
        await User.findOne({ where: { _id: item.userId } }).then(user => {
            user.todoLists.push(item);
            return user.save();
        });

        return item;
    };
}
