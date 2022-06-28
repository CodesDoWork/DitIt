import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ObjectID } from "mongodb";
import { CommonEntity } from "./common.entity";

@Injectable()
export abstract class CommonService<T extends CommonEntity, C extends object, P extends object> {
    protected constructor(
        protected readonly entity: typeof CommonEntity,
        private readonly entityName: string
    ) {}

    findOne = async (id: string | ObjectID): Promise<T> => {
        const _id = typeof id === "string" ? new ObjectID(id) : id;
        const res = (await this.entity.findOne({ where: { _id } })) as T;
        if (!res) {
            throw new NotFoundException();
        }

        return res;
    };

    create = async (info: C): Promise<T> =>
        (this.entity.create(await this.processCreationDto(info)).save() as Promise<T>)
            .then(this.postCreate)
            .catch(err => {
                Logger.error(err);
                throw new BadRequestException(`This ${this.entityName} already exists!`);
            });

    patch = async (id: T | ObjectID | string, patch: P): Promise<T> =>
        (await this.entity
            .merge(await this.getEntity(id), await this.processPatchDto(patch))
            .save()) as T;

    getEntity = async (id: T | ObjectID | string): Promise<T> =>
        (id as T).save !== undefined ? (id as T) : this.findOne(id as string | ObjectID);

    processCreationDto = async (data: C): Promise<object> => data;

    processPatchDto = async (data: P): Promise<object> => data;

    postCreate = async (item: T): Promise<T> => item;
}
