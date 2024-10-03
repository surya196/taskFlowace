class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ConflictError extends AppError {
    constructor(msg: string) {
        super(`Conflict: ${msg}`, 409);
    }
}

export class BadRequestError extends AppError {
    constructor(msg: string) {
        super(`Bad Request: ${msg}`, 400);
    }
}

export class InternalServerError extends AppError {
    constructor(msg: string) {
        super(`Internal Server Error: ${msg}`, 500);
    }
}

export class ServiceUnavailableError extends AppError {
    constructor(msg: string) {
        super(`Service Unavailable: ${msg}`, 503);
    }
}

export class NotFoundError extends AppError {
    constructor(msg: string) {
        super(`Not Found: ${msg}`, 404);
    }
}

export class UnAuthorizedError extends AppError {
    constructor(msg: string) {
        super(`unAuthorized: ${msg}`, 401);
    }
}