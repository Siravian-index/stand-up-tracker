
import { z } from "zod";

export const participantSchema = z.object({
  id: z.string(),
  name: z.string(),
  hasParticipated: z.boolean().default(false),
  templateId: z.string(),
})


export type ParticipantType  = z.infer<typeof participantSchema>