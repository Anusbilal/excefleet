import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Schedule } from "@/models/Schedule";
import mongoose from "mongoose";
import { verifyToken } from "@/utils/middleware/auth";

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyToken(req);
    if (auth instanceof NextResponse) return auth;
    await connectDB();

    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: "Body must be an array of schedule objects." },
        { status: 400 }
      );
    }

    // Convert string IDs to ObjectIds
    const schedules = body.map((schedule) => ({
      driver_id: new mongoose.Types.ObjectId(schedule.driver_id),
      date: new Date(schedule.date),
      stops: schedule.stops.map((stop: any) => ({
        ...stop,
        user_id: new mongoose.Types.ObjectId(stop.user_id),
      })),
      office: schedule.office,
    }));

    await Schedule.insertMany(schedules);

    return NextResponse.json({
      message: `${schedules.length} dummy schedules inserted successfully.`,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to insert dummy schedules" },
      { status: 500 }
    );
  }
}
