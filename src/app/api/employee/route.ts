import { NextRequest, NextResponse } from "next/server";
import { createEmployee, getAllEmployees } from "@/lib/controllers/employee/employee.controller";
import { verifyToken } from "@/utils/middleware/auth";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const result = await createEmployee(body);

  return NextResponse.json(
    {
      ...result,
      data: result.data || null,
    },
    {
      status: result.success ? 200 : 400,
    }
  );
}

export async function GET(req: NextRequest) {
  const auth = await verifyToken(req);
  if (auth instanceof NextResponse) return auth;
  
  await connectDB();
  const result = await getAllEmployees();

  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}