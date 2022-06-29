import { ObjectID } from "typeorm";
import { TodoDto } from "@todo-app/types";
import { Priorities, Priority, SortMode } from "@todo-app/types-enums";

const sortByCreation = (todos: TodoDto[]) =>
    [...todos].sort((t1, t2) =>
        (t1._id as ObjectID).generationTime > (t2._id as ObjectID).generationTime ? 1 : -1
    );

const sortAlphabetic = (todos: TodoDto[]) =>
    [...todos].sort((t1, t2) => t1.name.localeCompare(t2.name));

const sortByPriority = (todos: TodoDto[]) =>
    [...todos].sort((t1, t2) =>
        Priorities[t1.priority || Priority.None] > Priorities[t2.priority || Priority.None] ? 1 : -1
    );

const sortByDeadline = (todos: TodoDto[]) =>
    [...todos].sort((t1, t2) =>
        (new Date(t1.deadline?.toString() || 0).getTime() || 0) >
        (new Date(t2.deadline?.toString() || 0).getTime() || 0)
            ? 1
            : -1
    );

const sortManually = (todos: TodoDto[]) =>
    [...todos].sort((t1, t2) => ((t1.manualSortIndex || 0) > (t2.manualSortIndex || 0) ? 1 : -1));

export const sortedTodos = (todos: TodoDto[], sortMode: SortMode): TodoDto[] => {
    switch (sortMode) {
        case SortMode.ByCreationAsc:
            return sortByCreation(todos);
        case SortMode.ByCreationDesc:
            return sortByCreation(todos).reverse();

        case SortMode.AlphabeticAsc:
            return sortAlphabetic(todos);
        case SortMode.AlphabeticDesc:
            return sortAlphabetic(todos).reverse();

        case SortMode.ByPriorityAsc:
            return sortByPriority(todos);
        case SortMode.ByPriorityDesc:
            return sortByPriority(todos).reverse();

        case SortMode.ByDeadlineAsc:
            return sortByDeadline(todos);
        case SortMode.ByDeadlineDesc:
            return sortByDeadline(todos).reverse();

        default:
            return sortManually(todos);
    }
};
