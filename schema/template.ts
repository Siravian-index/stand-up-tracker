
import { z } from "zod";

export const templateSchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    settingsId: z.string(),
})

export const templateListSchema = z.array(templateSchema)





export type TemplateType = z.infer<typeof templateSchema>