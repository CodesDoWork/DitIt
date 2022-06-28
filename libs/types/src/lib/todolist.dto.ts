import { ApiProperty } from "@nestjs/swagger";
import { ObjectID } from "typeorm";
import { SortMode } from "./enums";
import { TodoDto } from "./todo.dto";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TodoListDto {
    @ApiProperty({ type: "string" })
    _id: ObjectID | string;

    @ApiProperty()
    name: string;

    @ApiProperty({ enum: SortMode })
    sortMode: SortMode;

    @ApiProperty({ type: "string" })
    userId: ObjectID | string;

    @ApiProperty({ type: () => TodoDto, isArray: true })
    todos: TodoDto[];
}

export class CreateTodoListDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class PatchTodoListDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @ApiProperty({ enum: SortMode, required: false })
    @IsOptional()
    @IsEnum(SortMode)
    sortMode?: SortMode;
}
