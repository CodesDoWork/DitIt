import { BaseEntity, Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from "typeorm";
import { TodoList } from "../todolists/todolist.entity";
import { Priority, TodoDto } from "@todo-app/types";

@Entity()
export class Todo extends BaseEntity implements TodoDto {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    description: string | null;

    @Column()
    priority: Priority | null;

    @Column()
    deadline: Date | null;

    @Column()
    manualSortIndex: number | null;

    @ManyToOne(() => TodoList, list => list.todos)
    list: TodoList;
}
