

export const MAX_TEMPLATE_LIMIT = 3

export class TemplateLimitReached extends Error {
    constructor(msg = "Max Template limit reached") {
        super(msg)
    }
}