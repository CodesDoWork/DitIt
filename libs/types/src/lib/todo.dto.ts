import { ApiProperty } from "@nestjs/swagger";
import { ObjectID } from "typeorm";
import { Priority } from "./enums";
import { IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, IsString } from "class-validator";
import { IsNotBlank } from "./validation";

export class TodoDto {
    @ApiProperty({ type: "string" })
    _id: ObjectID | string;

    @ApiProperty()
    name: string;

    @ApiProperty({ nullable: true })
    description: string | null;

    @ApiProperty({ enum: Priority, nullable: true })
    priority: Priority | null;

    @ApiProperty({ nullable: true })
    deadline: Date | null;

    @ApiProperty({ nullable: true })
    manualSortIndex: number | null;

    @ApiProperty()
    done: boolean;

    @ApiProperty({ type: "string" })
    listId: ObjectID | string;
}

export class CreateTodoDto {
    @ApiProperty()
    @IsString()
    @IsNotBlank()
    name: string;

    @ApiProperty({ nullable: true, required: false })
    @IsOptional()
    @IsString()
    description?: string | null;

    @ApiProperty({ enum: Priority, nullable: true, required: false })
    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority | null;

    @ApiProperty({ nullable: true, required: false })
    @IsOptional()
    @IsDateString()
    deadline?: string | null;

    @ApiProperty()
    @IsMongoId()
    listId: string;
}

export class PatchTodoDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsNotBlank()
    name?: string;

    @ApiProperty({ nullable: true, required: false })
    @IsOptional()
    @IsString()
    description?: string | null;

    @ApiProperty({ enum: Priority, nullable: true, required: false })
    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority | null;

    @ApiProperty({ nullable: true, required: false })
    @IsOptional()
    @IsDateString()
    deadline?: string | null;

    @ApiProperty({ nullable: true, required: false })
    @IsOptional()
    @IsInt()
    manualSortIndex?: number | null;
}
