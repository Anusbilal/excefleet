import mongoose from "mongoose";
import { DriverAttendance } from "@/models/DriverAttendance";
import { driverAttendanceSchema } from "@/utils/validation/driverAttendanceSchema";

export async function markDriverAttendance(data: unknown) {
  const parsed = driverAttendanceSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.format(),
    };
  }

  const { driver_id, company_id, attendance, reason } = parsed.data;

  const newAttendance = await DriverAttendance.create({
    driver_id: new mongoose.Types.ObjectId(driver_id),
    company_id: new mongoose.Types.ObjectId(company_id),
    attendance,
    reason,
  });

  return {
    success: true,
    message:
      attendance === "on_duty"
        ? "Great! You're marked as On Duty for today."
        : "Status updated to Off. See you next time!",
    // data: newAttendance,
  };
}
