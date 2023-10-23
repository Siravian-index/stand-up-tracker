
import { z } from "zod";
import { participantSchema } from "./participant";

const templateSchema = z.object({
    id: z.string(),
    name: z.string().min(10, { message: "Template name should have at least 10 letters" }),
    createdAt: z.date(),
    updatedAt: z.date(),
    settingsId: z.string(),
})


export type TemplateType = z.infer<typeof templateSchema>


// create new template
export const newTemplateSchema = templateSchema
    .omit({ id: true, settingsId: true, createdAt: true, updatedAt: true })
    .extend({
        participants: participantSchema.omit({ id: true, templateId: true }).array(),
        time: z.number().min(10, { message: "Minimum 10 seconds" }).max(300, { message: "Maximum 300 seconds" }),
    })


export type NewTemplateType = z.infer<typeof newTemplateSchema>


export const updateTemplateSchema = newTemplateSchema.extend({
    templateId: z.string(),
    participants: participantSchema.omit({ templateId: true }).partial({id: true}).array()
})

export type UpdateTemplateType = z.infer<typeof updateTemplateSchema>
