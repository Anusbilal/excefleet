import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/utils/middleware/roleGuard";
import { connectDB } from "@/lib/mongoose";
import { getEmployeeById } from "@/lib/controllers/admin/employee.controller";

export async function GET(req: NextRequest, { params }: { params: { employee_id: string } }) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  await connectDB();

  const employeeId = params.employee_id;

  if (!employeeId) {
    return NextResponse.json({ success: false, message: "employee_id is required" }, { status: 400 });
  }

  const employee = await getEmployeeById(employeeId);

  if (!employee) {
    return NextResponse.json({ success: false, message: "Employee not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: employee }, { status: 200 });
}
