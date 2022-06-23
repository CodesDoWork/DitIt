import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CreateUserDto, LoginRequest, LoginResponse } from "@todo-app/types";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthorizedRequest } from "./types";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() info: CreateUserDto) {
        this.authService.register(info);
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    @ApiBody({ type: LoginRequest })
    @ApiResponse({ type: LoginResponse, status: 200 })
    login(@Request() req: AuthorizedRequest): Promise<LoginResponse> {
        return this.authService.login(req.user);
    }
}
