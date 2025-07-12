import { NextRequest, NextResponse } from "next/server";
import { createEmployee, getAllEmployees, updateEmployeeController } from "@/lib/controllers/admin/employee.controller";
import { requireRole } from "@/utils/middleware/roleGuard";
import { connectDB } from "@/lib/mongoose";
export async function POST(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  await connectDB();

  try {
    const formData = await req.formData();
    const result = await createEmployee(formData);

    const success = result.success === true;

    return NextResponse.json(
      {
        success,
        message: result.message || null,
        data: result.data || null,
      },
      {
        status: success ? 200 : 400,
      }
    );
  } catch (err) {
    console.error("❌ Unexpected error in POST /employee:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  await connectDB();
  const { searchParams } = req.nextUrl;

  const page = parseInt(searchParams.get("page") || "1", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);
  const query = searchParams.get("q") || "";
  const result = await getAllEmployees({ page, size, q: query });
  return NextResponse.json(result, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  return await updateEmployeeController(req);
}