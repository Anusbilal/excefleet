import { z } from "zod";

export const createRatingSchema = z.object({
  rating: z.number().min(1).max(5),
  created_by: z.string().min(1),
  driver_id: z.string().min(1),
  feedback: z.string().optional(),
});
