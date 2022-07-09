import { User } from "../app/users/user.entity";
import { TodoList } from "../app/todolists/todolist.entity";
import { Todo } from "../app/todos/todo.entity";
import { DataSource } from "typeorm";

const SECRET = process.env.SECRET;
if (!SECRET) {
    throw new Error("SECRET environment variable is required.");
}

export const environment = {
    production: true,
    loglevel: process.env.LEGLEVEL || "warn",
    port: process.env.PORT || 3333,
    database: new DataSource({
        type: "mongodb",
        host: "localhost",
        port: 27017,
        database: "todo_app",
        logging: true,
        synchronize: true,
        entities: [User, TodoList, Todo],
        useUnifiedTopology: true,
    }),
    jwt: {
        secret: SECRET,
        expiresIn: "30d",
    },
    encryption: {
        saltRounds: 10,
    },
};
