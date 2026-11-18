import { z } from "zod";

// Accepts absolute http(s) URLs and site-relative paths (e.g. "/photos/a.jpg").
export const imageUrlSchema = z.string().refine(
  (value) => value.startsWith("/") || /^https?:\/\//i.test(value),
  { message: "Enter a valid image URL or a path starting with /." },
);
