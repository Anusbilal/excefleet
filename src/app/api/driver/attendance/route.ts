import { NextRequest, NextResponse } from "next/server";
import { markDriverAttendance } from "@/lib/controllers/driver/driverAttendance.controller";
import { verifyToken } from "@/utils/middleware/auth";

export async function POST(req: NextRequest) {
  const auth = await verifyToken(req);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  const result = await markDriverAttendance(body);

  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}
