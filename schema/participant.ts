
import { z } from "zod";

const participantSchema = z.object({
  id: z.string(),
  name: z.string(),
  hasParticipated: z.boolean().default(false),
})


export type ParticipantType  = z.infer<typeof participantSchema>