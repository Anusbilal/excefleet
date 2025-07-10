import { NextRequest, NextResponse } from "next/server";
import { createCompanyController, getCompaniesController, updateCompanyController } from "@/lib/controllers/admin/company.controller";
import { verifyToken } from "@/utils/middleware/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const tokenResult = await verifyToken(req);
  if (tokenResult instanceof NextResponse) {
    return tokenResult;
  }
  return await createCompanyController(req);
}


export async function GET(req: NextRequest) {
  const tokenResult = await verifyToken(req);
  if (tokenResult instanceof NextResponse) {
    return tokenResult;
  }

  return await getCompaniesController(req);
}

export async function PUT(req: NextRequest) {
  const tokenResult = await verifyToken(req);
  if (tokenResult instanceof NextResponse) return tokenResult;
  return await updateCompanyController(req);
}