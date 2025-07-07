import { NextRequest, NextResponse } from "next/server";
import { getDriverScheduleToday } from "@/lib/controllers/driver/schedule.controller";

export async function POST(
  req: NextRequest,
  { params }: { params: { driver_id: string } }
) {
  const body = await req.json();
  
  // Create an async function to "await" the params
  const getParams = async () => params;
  const { driver_id } = await getParams();

  const result = await getDriverScheduleToday({
    driver_id,
    latitude: body.latitude,
    longitude: body.longitude,
  });

  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}