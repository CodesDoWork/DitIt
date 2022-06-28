import { Column, Entity, ObjectID } from "typeorm";
import { Priority, TodoDto } from "@todo-app/types";
import { CommonEntity } from "../common/common.entity";

@Entity()
export class Todo extends CommonEntity implements TodoDto {
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

    @Column()
    done: boolean;

    @Column()
    listId: ObjectID;
}
