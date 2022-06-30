import { registerDecorator, ValidationOptions } from "class-validator";

export function IsNotBlank(options?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: "IsNotBlank",
            target: object.constructor,
            propertyName,
            constraints: [],
            options: { message: `'${propertyName}' must not be blank!`, ...options },
            validator: {
                validate(value: unknown) {
                    return typeof value === "string" && !!value.trim();
                },
            },
        });
    };
}
