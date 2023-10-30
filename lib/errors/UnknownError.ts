
export class UnknownError extends Error {
    constructor (message = "Sorry, something went wrong. Please try again later.") {
        super(message)
    }
}