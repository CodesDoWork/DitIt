export enum SortMode {
    Manual = "Manual",
    AlphabeticAsc = "Alphabetic asc",
    AlphabeticDesc = "Alphabetic desc",
    ByPriorityAsc = "By priority asc",
    ByPriorityDesc = "By priority desc",
    ByCreationAsc = "By creation asc",
    ByCreationDesc = "By creation desc",
    ByDeadlineAsc = "By deadline asc",
    ByDeadlineDesc = "By deadline desc",
}

export enum Priority {
    None = "none",
    Low = "low",
    Normal = "normal",
    Important = "important",
    Critical = "critical",
}

export const Priorities: Record<Priority, number> = {
    [Priority.None]: 0,
    [Priority.Low]: 1,
    [Priority.Normal]: 2,
    [Priority.Important]: 3,
    [Priority.Critical]: 4,
};
