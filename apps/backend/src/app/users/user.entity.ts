import {
    AfterInsert,
    AfterLoad,
    AfterUpdate,
    BaseEntity,
    Column,
    Entity,
    ObjectID,
    ObjectIdColumn,
    OneToMany,
} from "typeorm";
import { TodoList } from "../todolists/todolist.entity";
import { UserDto } from "@todo-app/types";

@Entity()
export class User extends BaseEntity implements UserDto {
    @ObjectIdColumn()
    id: ObjectID;

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

    @OneToMany(() => TodoList, list => list.user, { cascade: true })
    todoLists: TodoList[];

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    nullChecks() {
        if (!this.todoLists) {
            this.todoLists = [];
        }
    }

    export = (): UserDto => ({
        ...this,
        password: undefined,
    });
}
