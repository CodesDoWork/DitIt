import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto, PatchUserDto } from "@todo-app/types";
import { CryptoService } from "../crypto/crypto.service";
import { CommonService } from "../common/common.service";

@Injectable()
export class UsersService extends CommonService<User, CreateUserDto, PatchUserDto> {
    constructor(private readonly crypto: CryptoService) {
        super(User);
    }

    findOneByUsername = (username: string) => User.findOneBy({ username });

    processCreationDto = async ({ password, ...data }: CreateUserDto) => ({
        ...data,
        password: await this.crypto.hash(password),
        forename: null,
        surname: null,
        todoLists: [],
    });

    processPatchDto = async ({ password, ...data }: PatchUserDto) =>
        password
            ? {
                  ...data,
                  password: password ? await this.crypto.hash(password) : password,
              }
            : data;
}
