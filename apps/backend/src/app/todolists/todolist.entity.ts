import {
    AfterInsert,
    AfterLoad,
    AfterUpdate,
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    ObjectID,
    ObjectIdColumn,
    OneToMany,
} from "typeorm";
import { SortMode, TodoListDto, UserDto } from "@todo-app/types";
import { User } from "../users/user.entity";
import { Todo } from "../todos/todo.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class TodoList extends BaseEntity implements TodoListDto {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    sortMode: SortMode;

    @ManyToOne(() => User, user => user.todoLists)
    user: User;

    @OneToMany(() => Todo, todo => todo.list, { cascade: true })
    todos: Todo[];

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    nullChecks() {
        if (!this.todos) {
            this.todos = [];
        }
    }
}
