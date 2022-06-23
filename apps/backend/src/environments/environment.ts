import { TodoList } from "../app/todolists/todolist.entity";
import { User } from "../app/users/user.entity";
import { Todo } from "../app/todos/todo.entity";
import { DataSource } from "typeorm";

export const environment = {
    production: false,
    loglevel: process.env.LEGLEVEL || "debug",
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
        secret: "topsecret",
        expiresIn: "30d",
    },
    encryption: {
        saltRounds: 10,
    },
};
