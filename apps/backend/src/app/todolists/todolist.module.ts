import { Module } from "@nestjs/common";
import { TodoListsService } from "./todolist.service";
import { TodoListsController } from "./todolist.controller";

@Module({
    imports: [],
    providers: [TodoListsService],
    controllers: [TodoListsController],
    exports: [TodoListsService],
})
export class TodoListModule {}
