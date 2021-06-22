export class UnavailableConfigError extends Error {
    constructor(error: Error) {
        super(
            'Cannot retrieve Appointment Bot config file. Please make sure config file is available to the application.',
        );
        this.stack = error.stack;
    }
}
