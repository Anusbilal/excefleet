import { z } from "zod";

export const createRideSchema = z.object({
  ride: z.enum(["go_with_you", "go_by_myself"]),
  user_id: z.string().min(1, "User ID is required"),
  company_id: z.string().min(1, "Company ID is required"),
});
