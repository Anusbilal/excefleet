import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { DriverAttendance } from "@/models/DriverAttendance";
import { driverAttendanceSchema } from "@/utils/validation/driverAttendanceSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = driverAttendanceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { driver_id, company_id, attendance, reason } = parsed.data;

    await DriverAttendance.create({
      driver_id: new mongoose.Types.ObjectId(driver_id),
      company_id: new mongoose.Types.ObjectId(company_id),
      attendance,
      reason,
    });

    return NextResponse.json(
      {
        message:
          attendance === "on_duty"
            ? "Great! You're marked as On Duty for today."
            : "Status updated to Off. See you next time!",
      }
    );
  } catch (error) {
    console.error("Attendance marking failed:", error);
    return NextResponse.json(
      { success: false, message: "Server error while marking attendance." },
      { status: 500 }
    );
  }
}
