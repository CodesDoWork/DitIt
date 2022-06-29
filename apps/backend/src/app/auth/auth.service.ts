import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, LoginResponse, UserDto } from "@todo-app/types";
import { User } from "../users/user.entity";
import { Payload } from "./types";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<UserDto | null> {
        const user = await this.usersService.findOneByUsernameEmail(username);
        if (user && (await compare(pass, user.password))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    register = (info: CreateUserDto) => this.usersService.create(info);

    async login({ _id }: User): Promise<LoginResponse> {
        const payload: Payload = { sub: _id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
