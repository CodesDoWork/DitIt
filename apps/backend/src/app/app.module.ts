import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TodoModule } from "./todos/todo.module";
import { TodoListModule } from "./todolists/todolist.module";

@Module({
    imports: [AuthModule, UsersModule, TodoListModule, TodoModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
