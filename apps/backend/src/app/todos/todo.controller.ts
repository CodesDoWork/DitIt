import { Controller, Delete, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateTodoDto, PatchTodoDto, TodoDto } from "@todo-app/types";
import { AuthorizedRequest } from "../auth/types";
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
    async create(@Request() req: AuthorizedRequest<CreateTodoDto>) {
        return this.todoService.create(req.body);
    }

    @Patch(":id")
    @ApiBody({ type: PatchTodoDto })
    @ApiResponse({ type: TodoDto })
    async patch(
        @Param("id") id: string,
        @Request() req: AuthorizedRequest<PatchTodoDto>
    ): Promise<TodoDto> {
        return this.todoService.patch(id, req.body);
    }

    @Delete(":id")
    @ApiResponse({ type: TodoDto })
    delete(@Param("id") id: string, @Request() req: AuthorizedRequest): Promise<TodoDto> {
        return this.todoService.findOne(id).then(list => list.remove());
    }
}
