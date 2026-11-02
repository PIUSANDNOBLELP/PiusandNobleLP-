import { z } from "zod";

export const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required."),
  role: z.string().min(1, "Role is required."),
  focus: z.string().min(1, "Focus/bio is required."),
  photoUrl: z.string().url().optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().default(0),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});
