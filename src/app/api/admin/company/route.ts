import { NextRequest, NextResponse } from "next/server";
import { createCompanyController, getCompaniesController, updateCompanyController } from "@/lib/controllers/admin/company.controller";
import { requireRole } from "@/utils/middleware/roleGuard";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);

  if (auth instanceof NextResponse) return auth;
  return await createCompanyController(req);
}


export async function GET(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);

  if (auth instanceof NextResponse) return auth;
  return await getCompaniesController(req);
}
