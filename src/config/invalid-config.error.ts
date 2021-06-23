import { ValidationError } from 'class-validator';

export class InvalidConfigError extends Error {
    constructor(validationError: ValidationError[]) {
        super(validationError.map((value) => `${value.toString()}`).join('\n'));
    }
}
