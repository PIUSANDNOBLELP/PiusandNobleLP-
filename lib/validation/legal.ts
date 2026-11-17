import { z } from "zod";

export const legalPageSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, "Title is required."),
  body: z.string().min(1, "Content is required."),
});
