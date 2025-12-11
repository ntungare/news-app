export class AppError extends Error {
    public readonly statusCode: number;

    public constructor(statusCode: number, message?: string, options?: ErrorOptions) {
        super(message, options);
        this.statusCode = statusCode;
    }
}
