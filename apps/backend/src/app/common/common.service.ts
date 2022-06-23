import { Injectable } from "@nestjs/common";
import { BaseEntity, FindOneOptions, ObjectID } from "typeorm";

@Injectable()
export abstract class CommonService<T extends BaseEntity, C extends object, P extends object> {
    protected constructor(private readonly entity: typeof BaseEntity) {}

    findOne = async (id: string | ObjectID): Promise<T> =>
        this.entity.findOne(id as FindOneOptions);

    create = async (info: C) => this.entity.create(await this.processCreationDto(info)).save();

    patch = async (id: T | ObjectID | string, patch: P): Promise<T> =>
        (await this.entity
            .merge(await this.getEntity(id), await this.processPatchDto(patch))
            .save()) as T;

    getEntity = async (id: T | ObjectID | string): Promise<T> =>
        (id as T).save !== undefined ? (id as T) : this.findOne(id as string | ObjectID);

    processCreationDto = async (data: C): Promise<object> => data;

    processPatchDto = async (data: P): Promise<object> => data;
}
