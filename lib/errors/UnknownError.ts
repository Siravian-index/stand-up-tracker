
export class UnknownError extends Error {
    constructor (message = "Unknown error happened, try again later.") {
        super(message)
    }
}