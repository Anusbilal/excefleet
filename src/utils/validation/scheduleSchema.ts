import { z } from "zod";

export const driverScheduleSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    driver_id: z.string().min(1, "Driver ID is required"),
});
