import { NextRequest, NextResponse } from "next/server";
import { getDriverScheduleToday } from "@/lib/controllers/driver/schedule.controller";
import { verifyToken } from "@/utils/middleware/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { driver_id: string } }
) {
  const auth = await verifyToken(req);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  
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