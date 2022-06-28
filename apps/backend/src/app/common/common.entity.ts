import { BaseEntity, ObjectID, ObjectIdColumn } from "typeorm";

export class CommonEntity extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectID;
}
