import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Company } from "@/models/Company";
import bcrypt from "bcryptjs";
import { companySchema } from "@/utils/validation/company"
import { uploadFileToS3 } from "@/utils/upload/s3Uploader";
import { isValidObjectId } from "mongoose";
import z from "zod";

export const config = {
  api: {
    bodyParser: false,
  },
};

// POST /api/companies
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawData = {
      location: {
        lat: formData.get("lat"),
        lng: formData.get("lng"),
      },
      bussiness_nature: formData.get("bussiness_nature")?.toString() || undefined,
      name: formData.get("name")?.toString() || "",
      number_of_employees: formData.get("number_of_employees"),
      address: formData.get("address")?.toString() || undefined,
      city: formData.get("city")?.toString() || undefined,
      state: formData.get("state")?.toString() || undefined,
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || undefined,
      contact_person: formData.get("contact_person")?.toString() || undefined,
      login_email: formData.get("login_email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };
    const validatedData = companySchema.parse(rawData);
    const existingCompany = await Company.findOne({ email: validatedData.email });
    if (existingCompany) {
      return NextResponse.json(
        { message: "Company with this login email already exists." },
        { status: 409 }
      );
    }
    const logo = formData.get("logo") as File | null;
    let uploadedPath = "";
    if (logo && logo.size > 0) {
      uploadedPath = await uploadFileToS3(logo);
    }
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const newCompany = await Company.create({
      logo_url: uploadedPath,
      location: validatedData.location,
      bussiness_nature: validatedData.bussiness_nature,
      name: validatedData.name,
      number_of_employees: validatedData.number_of_employees,
      address: validatedData.address,
      city: validatedData.city,
      state: validatedData.state,
      email: validatedData.email,
      phone: validatedData.phone,
      contact_person: validatedData.contact_person,
      login_email: validatedData.login_email,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "Company added successfully.",
      logo_url: uploadedPath,
      name: newCompany.name,
      address: newCompany.address,
      email: newCompany.email,
      phone: newCompany.phone,
      contact_person: newCompany.contact_person,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.error("Company creation error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const company_id = searchParams.get("company_id");

    if (company_id) {
      if (!isValidObjectId(company_id)) {
        return NextResponse.json(
          { success: false, message: "Invalid company ID" },
          { status: 400 }
        );
      }

      const company = await Company.findById(company_id).select(
        "logo_url location bussiness_nature name number_of_employees address city state email phone contact_person login_email"
      );

      if (!company) {
        return NextResponse.json(
          { success: false, message: "Company not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
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
      });
    }

    const page = parseInt(searchParams.get("page") || "1", 10);
    const size = parseInt(searchParams.get("size") || "10", 10);
    const q = searchParams.get("q")?.toString() || "";

    const query = q ? { name: { $regex: q, $options: "i" } } : {};
    const total = await Company.countDocuments(query);

    const companies = await Company.find(query)
      .skip((page - 1) * size)
      .sort({ createdAt: -1 })
      .limit(size)
      .select("name address email phone contact_person");

    return NextResponse.json({
      data: companies,
      pagination: {
        total,
        page,
        size,
        totalPages: Math.ceil(total / size),
      },
    });
  } catch (error) {
    console.error("Error fetching company data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const company_id = searchParams.get('company_id');

  if (!company_id || !isValidObjectId(company_id)) {
    return NextResponse.json({ message: "Invalid company ID" }, { status: 400 });
  }

  try {

    const formData = await req.formData();
    const logo = formData.get("logo") as File | null;
    const password = formData.get("password")?.toString();
    let hashedPassword: string | undefined = undefined;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    let uploadedPath: string | undefined = undefined;

    if (logo) {
      uploadedPath = await uploadFileToS3(logo);
    }

    const updateData: any = {
      location: {
        lat: parseFloat(formData.get("lat")?.toString() || "0"),
        lng: parseFloat(formData.get("lng")?.toString() || "0"),
      },
      bussiness_nature: formData.get("bussiness_nature")?.toString(),
      name: formData.get("name")?.toString(),
      number_of_employees: Number(formData.get("number_of_employees")),
      address: formData.get("address")?.toString(),
      city: formData.get("city")?.toString(),
      state: formData.get("state")?.toString(),
      email: formData.get("email")?.toString(),
      phone: formData.get("phone")?.toString(),
      contact_person: formData.get("contact_person")?.toString(),
      login_email: formData.get("login_email")?.toString(),
    };

    if (uploadedPath) updateData.logo_url = uploadedPath;
    if (hashedPassword) updateData.password = hashedPassword;

    const updated = await Company.findByIdAndUpdate(company_id, updateData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "Company not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Company updated successfully.",
      logo_url: updated.logo_url,
      name: updated.name,
      address: updated.address,
      email: updated.email,
      phone: updated.phone,
      contact_person: updated.contact_person,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}