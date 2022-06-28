import { ObjectID } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { TodoListDto } from "./todolist.dto";

export class UserDto {
    @ApiProperty({ type: "string" })
    _id: ObjectID | string;

    @ApiProperty()
    username: string;

    @ApiProperty({ nullable: true })
    forename: string | null;

    @ApiProperty({ nullable: true })
    surname: string | null;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: () => TodoListDto, isArray: true })
    todoLists: TodoListDto[];
}

export class LoginResponse {
    @ApiProperty()
    access_token: string;
}

export class LoginRequest {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class CreateUserDto extends LoginRequest {
    @ApiProperty()
    @IsEmail()
    email: string;
}

export class PatchUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password?: string;

    @ApiProperty({ nullable: true, required: false })
    @IsOptional()
    @ValidateIf((object, value) => value !== null)
    @IsString()
    forename?: string | null;

    @ApiProperty({ nullable: true, required: false })
    @IsOptional()
    @ValidateIf((object, value) => value !== null)
    @IsString()
    surname?: string | null;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEmail()
    email?: string;
}
