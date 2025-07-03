import { NextRequest, NextResponse } from "next/server";
import { createRide } from "@/lib/controllers/employee/ride.controller";
import { verifyToken } from "@/utils/middleware/auth";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: NextRequest) {
  const auth = await verifyToken(req);
  if (auth instanceof NextResponse) return auth;

  await connectDB();
  const body = await req.json();
  const result = await createRide(body);

  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}
