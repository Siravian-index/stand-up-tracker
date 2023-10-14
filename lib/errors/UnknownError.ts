
export class UnknownError extends Error {
    constructor (message = "Unknown error happened") {
        super(message)
    }
}