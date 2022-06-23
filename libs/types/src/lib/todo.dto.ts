import { ApiProperty } from "@nestjs/swagger";
import { ObjectID } from "typeorm";
import { Priority } from "./types";
import { TodoListDto } from "./todolist.dto";
import {
    IsDateString,
    IsEnum,
    IsInt,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator";

export class TodoDto {
    @ApiProperty({ type: "string" })
    id: ObjectID;

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

    @ApiProperty({ type: () => TodoListDto })
    list: TodoListDto;
}

export class CreateTodoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
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
    list: string;
}

export class PatchTodoDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
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

    @ApiProperty({ required: false })
    @IsOptional()
    @IsMongoId()
    list?: string;
}
