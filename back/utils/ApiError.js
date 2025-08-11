export class ApiError extends Error {
    constructor(status, message, errors={}) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static BadRequest(message, errors) {
        return new ApiError(400, message, errors);
    }

    static Conflict(message) {
        return new ApiError(409, message);
    }

    static UnAuthorized() {
        return new ApiError(401, "Не авторизований")
    }
}