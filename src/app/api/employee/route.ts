import { NextRequest, NextResponse } from "next/server";
import { createUser, getAllEmployees } from "@/lib/controllers/user.controller";
import { verifyToken } from "@/utils/middleware/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await createUser(body);

  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}

export async function GET(req: NextRequest) {
  const auth = await verifyToken(req);
  
  if (auth instanceof NextResponse) return auth;

  const result = await getAllEmployees();

  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}