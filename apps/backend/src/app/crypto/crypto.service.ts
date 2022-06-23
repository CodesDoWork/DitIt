import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { environment } from "../../environments/environment";

@Injectable()
export class CryptoService {
    hash = (password: string) => hash(password, environment.encryption.saltRounds);

    isCorrect = (password: string, encrypted: string) => compare(password, encrypted);
}
