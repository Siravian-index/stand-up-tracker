import { PrismaResourceNotFound } from "./PrismaErrors"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { UnknownError } from "./UnknownError"

export class Validator {
    static validateErrorOrRedirect(error: unknown) {
        console.error(error)
        if (error instanceof PrismaResourceNotFound) {
            return [error.message, null] as const
        }
        if (error instanceof PrismaClientKnownRequestError) {
            return [error.message, null] as const
        }
        const unknownError = new UnknownError()
        return [unknownError.message, null] as const
    }
}