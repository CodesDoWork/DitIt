import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto, PatchUserDto } from "@todo-app/types";
import { CommonService } from "../common/common.service";
import { hash } from "bcrypt";

@Injectable()
export class UsersService extends CommonService<User, CreateUserDto, PatchUserDto> {
    constructor() {
        super(User, "user");
    }

    findOneByUsernameEmail = async (usernameOrEmail: string) =>
        (await User.findOneBy({ username: usernameOrEmail })) ||
        User.findOneBy({ email: usernameOrEmail });

    processCreationDto = async (data: CreateUserDto) => ({
        ...data,
        forename: null,
        surname: null,
    });

    processPatchDto = async ({ password, ...data }: PatchUserDto) => ({
        ...data,
        password: password ? await hash(password, 10) : undefined,
    });
}
