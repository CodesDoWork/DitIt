import { Priority } from "@todo-app/types-enums";
import { ValidatedFormInputProps } from "./ValidatedFormInput";

export const makeInput = (
    label: string,
    options: Partial<Omit<ValidatedFormInputProps, "label">> = {}
): ValidatedFormInputProps => {
    const { name = label.toLowerCase() } = options;
    return {
        type: "text",
        required: true,
        errorText: `Please enter a ${name}.`,
        ...options,
        name,
        label,
    };
};

// Login & register
export const usernameInput = makeInput("Username");
export const emailInput = makeInput("Email", { type: "email" });
export const usernameOrEmailInput = makeInput("Username/Email", {
    name: "username",
    errorText: "Please enter a username or email.",
});
export const passwordInput = makeInput("Password", { type: "password" });
export const confirmPasswordInput: ValidatedFormInputProps = {
    ...passwordInput,
    withConfirmation: true,
};

// Profile
export const forenameInput = makeInput("Forename", { required: false });
export const surnameInput = makeInput("Surname", { required: false });
export const currentPasswordInput = makeInput("Current Password", {
    type: "password",
    name: "currentPassword",
    errorText: "Please enter your password.",
});
export const newPasswordInput = makeInput("New Password", {
    name: "password",
    type: "password",
    withConfirmation: true,
});

// TodoLists
export const todolistName = makeInput("Name");

// Todos
export const nameInput = makeInput("Name");
export const descriptionInput = makeInput("Description", { required: false });
export const priorityInput = makeInput("Priority", {
    required: false,
    options: Object.entries(Priority),
});
export const deadlineInput = makeInput("Deadline", { type: "date", required: false });
