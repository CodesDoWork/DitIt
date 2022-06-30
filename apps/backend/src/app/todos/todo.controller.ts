import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateTodoDto, PatchTodoDto, TodoDto } from "@todo-app/types";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TodoService } from "./todo.service";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("Todos")
@Controller("todos")
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @ApiBody({ type: CreateTodoDto })
    @ApiResponse({ type: TodoDto })
    async create(@Body() todo: CreateTodoDto): Promise<TodoDto | void> {
        return this.todoService.create(todo);
    }

    @Patch(":id")
    @ApiBody({ type: PatchTodoDto })
    @ApiResponse({ type: TodoDto })
    async patch(@Param("id") id: string, @Body() patch: PatchTodoDto): Promise<TodoDto> {
        return this.todoService.patch(id, patch);
    }

    @Delete(":id")
    @ApiResponse({ type: TodoDto })
    delete(@Param("id") id: string): Promise<TodoDto> {
        return this.todoService.findOne(id).then(list => list.remove());
    }

    @Patch(":id/done")
    @ApiResponse({ type: TodoDto })
    async toggleDone(@Param("id") id: string): Promise<TodoDto> {
        return this.todoService.toggleDone(id);
    }
}
