import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity, ObjectID } from "typeorm";
import { SortMode, TodoListDto } from "@todo-app/types";
import { Todo } from "../todos/todo.entity";
import { CommonEntity } from "../common/common.entity";

@Entity()
export class TodoList extends CommonEntity implements TodoListDto {
    @Column()
    name: string;

    @Column()
    sortMode: SortMode;

    @Column()
    userId: ObjectID;

    todos: Todo[];

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    async loadRelations() {
        this.todos = await Todo.findBy({ listId: this._id });
    }
}
