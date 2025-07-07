import { NextRequest, NextResponse } from "next/server";
import { markDriverAttendance } from "@/lib/controllers/driver/driverAttendance.controller";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await markDriverAttendance(body);

  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}
