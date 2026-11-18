import { z } from "zod";
import { imageUrlSchema } from "@/lib/validation/image";

export const contentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required."),
  slug: z.string().optional(),
  kind: z.enum(["INSIGHT", "UPDATE"]),
  category: z.string().optional().or(z.literal("")),
  excerpt: z.string().optional().or(z.literal("")),
  coverImage: imageUrlSchema.optional().or(z.literal("")),
  body: z.string().min(1, "Body is required."),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  publishedAt: z.string().optional().or(z.literal("")),
});
