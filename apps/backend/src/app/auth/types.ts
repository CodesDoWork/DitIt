import { ObjectID } from "typeorm";
import { User } from "../users/user.entity";
import { IncomingMessage } from "http";

export type Payload = {
    sub: ObjectID;
};

export type AuthorizedRequest<T = Record<string, unknown>> = IncomingMessage & {
    body: T;
    user: User;
};
