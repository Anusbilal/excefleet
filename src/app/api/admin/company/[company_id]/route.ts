import { NextRequest, NextResponse } from "next/server";
import { updateCompanyController } from "@/lib/controllers/admin/company.controller";
import { connectDB } from "@/lib/mongoose";
import { getCompanyById } from "@/lib/controllers/admin/company.controller";
import { requireRole } from "@/utils/middleware/roleGuard";

export async function PUT(req: NextRequest, { params }: { params: { company_id: string } }) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;
  const company_id = params.company_id;

  if (!company_id) {
    return NextResponse.json({ success: false, message: "company_id is required" }, { status: 400 });
  }

  return await updateCompanyController(req, company_id);
}

export async function GET(req: NextRequest, { params }: { params: { company_id: string } }) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  await connectDB();

  const company_id = params.company_id;

  if (!company_id) {
    return NextResponse.json(
      { success: false, message: "company_id is required" },
      { status: 400 }
    );
  }

  const company = await getCompanyById(company_id);

  if (!company) {
    return NextResponse.json(
      { success: false, message: "Company not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      logo_url: company.logo_url,
      location: company.location,
      bussiness_nature: company.bussiness_nature,
      name: company.name,
      number_of_employees: company.number_of_employees,
      address: company.address,
      city: company.city,
      state: company.state,
      email: company.email,
      phone: company.phone,
      contact_person: company.contact_person,
      login_email: company.login_email,
    },
  });
}