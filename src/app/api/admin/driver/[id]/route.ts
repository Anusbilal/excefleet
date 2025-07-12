import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/utils/middleware/roleGuard";
import { getDriverById } from "@/lib/controllers/driver/driver.controller";

export async function GET(req: NextRequest, { params }: { params: {
    id: any; company_id: string 
} }) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "id is required" },
      { status: 400 }
    );
  }

  const result = await getDriverById(id);

  return NextResponse.json(result, {
    status: result.success ? 200 : 404,
  });
}
