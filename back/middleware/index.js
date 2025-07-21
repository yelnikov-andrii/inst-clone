import { ApiError } from "../utils/ApiError.js"

export const errorMiddleware = (error, req, res, next) => {
    if (error instanceof ApiError) {
        const { status, message, errors } = error;

        res.status(status).send({ message, errors })
    } else {
        console.log(error, 'error')
        res.status(500).send("Невідома помилка")
    }
}