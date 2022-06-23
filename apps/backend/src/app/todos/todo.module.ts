import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { TodoListModule } from "../todolists/todolist.module";

@Module({
    imports: [TodoListModule],
    providers: [TodoService],
    controllers: [TodoController],
    exports: [TodoService],
})
export class TodoModule {}
