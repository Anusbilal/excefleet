import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/middleware/auth";
import { driverScheduleSchema } from "@/utils/validation/scheduleSchema";
import { connectDB } from "@/lib/mongoose";
import { Schedule } from "@/models/Schedule";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const AVERAGE_SPEED_KMPH = 30;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const auth = await verifyToken(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const driver_id = searchParams.get("driver_id");

    if (!driver_id || !isValidObjectId(driver_id)) {
      return NextResponse.json({ error: "Invalid or missing driver_id" }, { status: 400 });
    }

    const parsed = driverScheduleSchema.safeParse({
      driver_id,
      latitude: body.latitude,
      longitude: body.longitude,
    });

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.format() }, { status: 400 });
    }

    await connectDB();

    const { latitude, longitude } = parsed.data;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const schedule = await Schedule.findOne({
      driver_id: new mongoose.Types.ObjectId(driver_id),
      date: { $gte: todayStart, $lte: todayEnd },
    });

    if (!schedule) {
      return NextResponse.json({
        success: false,
        error: { message: "No schedule found for today." },
      }, { status: 404 });
    }

    let currentTime = new Date();
    let currentLat = latitude;
    let currentLng = longitude;
    const stopsWithETA = [];

    for (const stop of schedule.stops) {
      const stopLat = stop.lat ?? 0;
      const stopLng = stop.long ?? 0;

      const distance = haversineDistance(currentLat, currentLng, stopLat, stopLng);
      const travelTimeMinutes = (distance / AVERAGE_SPEED_KMPH) * 60;

      currentTime = new Date(currentTime.getTime() + travelTimeMinutes * 60000);

      stopsWithETA.push({
        passenger_name: stop.name,
        passenger_id: stop.user_id,
        latitude: stopLat,
        longitude: stopLng,
        address: stop.address,
        arrival_time: currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      currentLat = stopLat;
      currentLng = stopLng;
    }

    const officeLat = schedule.office.lat ?? 0;
    const officeLng = schedule.office.long ?? 0;

    const officeDistance = haversineDistance(currentLat, currentLng, officeLat, officeLng);
    const officeTravelTimeMinutes = (officeDistance / AVERAGE_SPEED_KMPH) * 60;

    const officeETA = new Date(currentTime.getTime() + officeTravelTimeMinutes * 60000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return NextResponse.json({
        driver_id,
        stops: stopsWithETA,
        office: {
          lat: officeLat,
          long: officeLng,
          address: schedule.office.address,
          arrival_time: officeETA,
        },
    });

  } catch (error) {
    console.error("Schedule fetch error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
