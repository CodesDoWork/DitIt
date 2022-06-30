import { ApiProperty } from "@nestjs/swagger";
import { ObjectID } from "typeorm";
import { SortMode } from "./enums";
import { TodoDto } from "./todo.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { IsNotBlank } from "./validation";

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
    @IsNotBlank()
    name: string;
}

export class PatchTodoListDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsNotBlank()
    name?: string;

    @ApiProperty({ enum: SortMode, required: false })
    @IsOptional()
    @IsEnum(SortMode)
    sortMode?: SortMode;
}
