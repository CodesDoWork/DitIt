import {
    CreateTodoDto,
    CreateTodoListDto,
    CreateUserDto,
    LoginRequest,
    LoginResponse,
    PatchTodoDto,
    PatchTodoListDto,
    PatchUserDto,
    TodoDto,
    TodoListDto,
    UserDto,
} from "@todo-app/types";
import axios, { AxiosError } from "axios";
import { ObjectID } from "typeorm";

type ErrorData = {
    statusCode: number;
    message: string;
    error?: string;
};

const mapError = (err: AxiosError<ErrorData>) => {
    let msg: string;
    switch (err.response?.status) {
        case 401:
            msg = "Invalid credentials!";
            break;

        default:
            msg = err.response?.data.message || "Something went wrong!";
    }

    throw new Error(msg);
};

export namespace Api {
    const axiosInstance = axios.create({ baseURL: "/api" });

    // auth

    export const register = async (data: CreateUserDto) =>
        axiosInstance.post("/auth/register", data).catch(mapError);

    export const login = (data: LoginRequest): Promise<string> =>
        axiosInstance
            .post<LoginResponse>("/auth/login", data)
            .then(res => res.data.access_token)
            .catch(mapError);

    export const authorize = (token: string, callback: (user?: UserDto | null) => void) => {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        getMe()
            .then(callback)
            .catch(err => {
                if (err.response?.status === 401) {
                    logout();
                    callback(null);
                } else {
                    callback(undefined);
                }
            });
    };

    export const logout = () => delete axiosInstance.defaults.headers.common["Authorization"];

    // user

    export const getMe = (): Promise<UserDto> =>
        axiosInstance
            .get<UserDto>("/users/me")
            .then(res => res.data)
            .catch(mapError);

    export const patchMe = (patch: PatchUserDto): Promise<UserDto> =>
        axiosInstance
            .patch<UserDto>("/users/me", patch)
            .then(res => res.data)
            .catch(mapError);

    export const deleteMe = () => axiosInstance.delete("/users/me").catch(mapError);

    // todolist

    export const createList = (user: UserDto, list: CreateTodoListDto): Promise<TodoListDto> =>
        axiosInstance
            .post<TodoListDto>("/todolists", list)
            .then(res => res.data)
            .then(res => {
                user.todoLists.push(res);
                return res;
            })
            .catch(mapError);

    export const patchList = (
        listId: ObjectID | string,
        user: UserDto,
        patch: PatchTodoListDto
    ): Promise<TodoListDto> =>
        axiosInstance
            .patch<TodoListDto>(`/todolists/${listId}`, patch)
            .then(res => {
                user.todoLists[user.todoLists.findIndex(list => list._id === listId)] = res.data;
                return res.data;
            })
            .catch(mapError);

    export const deleteList = (listId: ObjectID | string, user: UserDto) =>
        axiosInstance
            .delete(`/todolists/${listId}`)
            .then(() => (user.todoLists = user.todoLists.filter(list => list._id !== listId)))
            .catch(mapError);

    // todos

    export const createTodo = (list: TodoListDto, todo: CreateTodoDto): Promise<TodoDto> =>
        axiosInstance
            .post<TodoDto>("/todos", todo)
            .then(res => {
                list.todos.push(res.data);
                return res.data;
            })
            .catch(mapError);

    export const patchTodo = (
        todoId: ObjectID | string,
        patch: PatchTodoDto,
        list?: TodoListDto
    ): Promise<TodoDto> =>
        axiosInstance
            .patch<TodoDto>(`todos/${todoId}`, patch)
            .then(res => {
                list && (list.todos[list.todos.findIndex(todo => todo._id === todoId)] = res.data);
                return res.data;
            })
            .catch(mapError);

    export const deleteTodo = (todoId: ObjectID | string, list: TodoListDto) =>
        axiosInstance
            .delete(`/todos/${todoId}`)
            .then(() => (list.todos = list.todos.filter(todo => todo._id !== todoId)))
            .catch(mapError);

    export const toggleDone = (todo: TodoDto): Promise<TodoDto> =>
        axiosInstance
            .patch<TodoDto>(`todos/${todo._id}/done`)
            .then(res => {
                todo.done = !todo.done;
                return res.data;
            })
            .catch(mapError);
}
