import { Controller, Delete, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateTodoListDto, PatchTodoListDto, TodoListDto } from "@todo-app/types";
import { AuthorizedRequest } from "../auth/types";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TodoListsService } from "./todolist.service";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("todolists")
@ApiTags("Todo Lists")
export class TodoListsController {
    constructor(private readonly todoListService: TodoListsService) {}

    @Post()
    @ApiBody({ type: CreateTodoListDto })
    async create(@Request() req: AuthorizedRequest<CreateTodoListDto>) {
        return this.todoListService.create({ ...req.body, user: req.user });
    }

    @Patch(":id")
    @ApiBody({ type: PatchTodoListDto })
    @ApiResponse({ type: TodoListDto })
    async patch(
        @Param("id") id: string,
        @Request() req: AuthorizedRequest<PatchTodoListDto>
    ): Promise<TodoListDto> {
        return this.todoListService.patch(id, req.body);
    }

    @Delete(":id")
    @ApiResponse({ type: TodoListDto })
    delete(@Param("id") id: string, @Request() req: AuthorizedRequest): Promise<TodoListDto> {
        return this.todoListService.findOne(id).then(list => list.remove());
    }
}
