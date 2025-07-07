import { connectDB } from "@/lib/mongoose";
import { Schedule } from "@/models/Schedule";
import { driverScheduleSchema } from "@/utils/validation/scheduleSchema";
import mongoose from "mongoose";

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

export async function getDriverScheduleToday(data: unknown) {
  const parsed = driverScheduleSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.format() };
  }

  const { driver_id } = parsed.data;
  let { latitude, longitude } = parsed.data;

  await connectDB();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const schedule = await Schedule.findOne({
    driver_id: new mongoose.Types.ObjectId(driver_id),
    date: { $gte: todayStart, $lte: todayEnd },
  });

  if (!schedule) {
    return {
      success: false,
      error: { message: "No schedule found for today." },
    };
  }

  let currentTime = new Date();
  const stopsWithETA = [];

  for (const stop of schedule.stops) {
    const stopLat = stop.lat ?? 0;
    const stopLong = stop.long ?? 0;

    const distance = haversineDistance(latitude, longitude, stopLat, stopLong);
    const travelTimeMinutes = (distance / AVERAGE_SPEED_KMPH) * 60;

    currentTime = new Date(currentTime.getTime() + travelTimeMinutes * 60000);

    stopsWithETA.push({
      passenger_name: stop.name,
      passenger_id: stop.user_id,
      latitude: stopLat,
      longitude: stopLong,
      address: stop.address,
      arrival_time: currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    latitude = stopLat;
    longitude = stopLong;
  }

  const officeLat = schedule.office.lat ?? 0;
  const officeLong = schedule.office.long ?? 0;

  const officeDistance = haversineDistance(latitude, longitude, officeLat, officeLong);
  const officeTravelTimeMinutes = (officeDistance / AVERAGE_SPEED_KMPH) * 60;

  const officeETA = new Date(
    currentTime.getTime() + officeTravelTimeMinutes * 60000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    success: true,
    data: {
      driver_id,
      stops: stopsWithETA,
      office: {
        lat: officeLat,
        long: officeLong,
        address: schedule.office.address,
        arrival_time: officeETA,
      },
    },
  };
}
