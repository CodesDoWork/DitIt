import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, LoginResponse, UserDto } from "@todo-app/types";
import { User } from "../users/user.entity";
import { CryptoService } from "../crypto/crypto.service";
import { Payload } from "./types";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<UserDto | null> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && (await this.cryptoService.isCorrect(pass, user.password))) {
            const { password, ...result } = user;
            return result as UserDto;
        }

        return null;
    }

    register = (info: CreateUserDto) => this.usersService.create(info);

    async login({ id }: User): Promise<LoginResponse> {
        const payload: Payload = { sub: id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
