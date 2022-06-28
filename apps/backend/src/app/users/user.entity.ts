import { AfterInsert, AfterLoad, AfterUpdate, BeforeInsert, Column, Entity } from "typeorm";
import { TodoList } from "../todolists/todolist.entity";
import { UserDto } from "@todo-app/types";
import { CommonEntity } from "../common/common.entity";
import { hash } from "bcrypt";

@Entity()
export class User extends CommonEntity implements UserDto {
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    forename: string | null;

    @Column()
    surname: string | null;

    @Column({ unique: true })
    email: string;

    todoLists: TodoList[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    async loadRelations() {
        this.todoLists = await TodoList.findBy({ userId: this._id });
    }

    export = (): UserDto => ({
        ...this,
        password: undefined,
    });
}
