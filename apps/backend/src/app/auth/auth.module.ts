import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { environment } from "../../environments/environment";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { CryptoModule } from "../crypto/crypto.module";

@Module({
    imports: [
        UsersModule,
        CryptoModule,
        PassportModule,
        JwtModule.register({
            secret: environment.jwt.secret,
            signOptions: { expiresIn: environment.jwt.expiresIn },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
