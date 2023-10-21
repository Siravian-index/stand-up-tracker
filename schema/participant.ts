
import { z } from "zod";

export const participantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Minimum 3 characters" }),
  hasParticipated: z.boolean().default(false),
  templateId: z.string(),
})


export type ParticipantType  = z.infer<typeof participantSchema>