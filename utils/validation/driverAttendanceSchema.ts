import { z } from "zod";

export const driverAttendanceSchema = z.object({
  driver_id: z.string().min(1),
  company_id: z.string().min(1),
  attendance: z.enum(["on_duty", "off"]),
  reason: z.string().optional(),
});
