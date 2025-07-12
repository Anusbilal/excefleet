import { signInAdmin } from "@/lib/controllers/admin/auth.controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await signInAdmin(body);

  return NextResponse.json(result, {
    status: result.token ? 200 : 401,
  });
}
