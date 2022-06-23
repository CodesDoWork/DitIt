import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CryptoModule } from "../crypto/crypto.module";
import { UsersController } from "./users.controller";

@Module({
    imports: [CryptoModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
