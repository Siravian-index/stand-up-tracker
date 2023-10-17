
import { z } from "zod";
import { participantSchema } from "./participant";

const templateSchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    settingsId: z.string(),
})


export type TemplateType = z.infer<typeof templateSchema>


// create new template

export const newTemplateSchema = z.object({
    name: z.string().min(10, { message: "Template name should have at least 10 letters" }),
    participants: z.object({
        name: z.string().min(3, { message: "Minimum 3 characters" }),
        hasParticipated: z.boolean(),
        key: z.string()
    }).array(),
    // .min(2, { message: "Add at least 2 participants" }),
    time: z.number().min(10, { message: "Minimum 10 seconds" }).max(300, { message: "Maximum 300 seconds" }),
})


export type newTemplateType = z.infer<typeof newTemplateSchema>
