import { Body, Controller, Delete, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
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
    @ApiResponse({ type: TodoListDto })
    async create(
        @Body() list: CreateTodoListDto,
        @Request() req: AuthorizedRequest<CreateTodoListDto>
    ): Promise<TodoListDto> {
        return this.todoListService.create({ ...list, user: req.user });
    }

    @Patch(":id")
    @ApiBody({ type: PatchTodoListDto })
    @ApiResponse({ type: TodoListDto })
    async patch(@Param("id") id: string, @Body() patch: PatchTodoListDto): Promise<TodoListDto> {
        return this.todoListService.patch(id, patch);
    }

    @Delete(":id")
    @ApiResponse({ type: TodoListDto })
    delete(@Param("id") id: string): Promise<TodoListDto> {
        return this.todoListService.findOne(id).then(list => list.remove());
    }
}
