import { CreateTodoListDto } from "@todo-app/types";
import { User } from "../users/user.entity";

export type CreateTodoList = CreateTodoListDto & {
    user: User;
};
