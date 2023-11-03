

export class SessionError extends Error {
    constructor(message = "Session not found") {
        super(message)
    }
}