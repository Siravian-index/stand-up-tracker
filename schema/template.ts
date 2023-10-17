
import { z } from "zod";
import { participantSchema } from "./participant";

const templateSchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    settingsId: z.string(),
})

const templateListSchema = z.array(templateSchema)


export type TemplateType = z.infer<typeof templateSchema>


// create new template

const newTemplateSchema = z.object({
    name: z.string(),
    participants: z.array(participantSchema.omit({id: true, templateId: true})),
    time: z.number(),
})


export type newTemplateType = z.infer<typeof newTemplateSchema>
