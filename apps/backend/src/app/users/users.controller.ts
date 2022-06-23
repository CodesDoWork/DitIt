import { Controller, Delete, Get, Patch, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PatchUserDto, UserDto } from "@todo-app/types";
import { AuthorizedRequest } from "../auth/types";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("users")
@ApiTags("Users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("me")
    @ApiResponse({ type: UserDto })
    get(@Request() req: AuthorizedRequest): UserDto {
        return req.user.export();
    }

    @Patch("me")
    @ApiBody({ type: PatchUserDto })
    @ApiResponse({ type: UserDto })
    async patch(@Request() req: AuthorizedRequest<PatchUserDto>): Promise<UserDto> {
        return this.usersService.patch(req.user, req.body).then(user => user.export());
    }

    @Delete("me")
    @ApiResponse({ type: UserDto })
    delete(@Request() req: AuthorizedRequest): Promise<UserDto> {
        return req.user.remove().then(user => user.export());
    }
}
