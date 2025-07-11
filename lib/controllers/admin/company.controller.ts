import { NextRequest, NextResponse } from "next/server";
import { Company } from "@/models/Company";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import path from "path";
import { Types } from "mongoose";
import fs from "fs/promises";

export async function createCompanyController(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const logo = formData.get("logo") as File;

    const password = formData.get("password")?.toString() || "";
    const hashedPassword = await bcrypt.hash(password, 10);
    let uploadedPath = "";
    const email = formData.get("email")?.toString() || "";

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return NextResponse.json(
        { message: "Company with this login email already exists." },
        { status: 409 } 
      );
    }

    if (logo) {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${logo.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      await fs.writeFile(filePath, buffer);
      uploadedPath = `/uploads/${fileName}`;
    }

    const newCompany = await Company.create({
      logo_url: uploadedPath,
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
    console.error("Company creation error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function getCompaniesController(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const q = searchParams.get("q")?.toString() || "";

  const query = q ? { name: { $regex: q, $options: "i" } } : {};

  const total = await Company.countDocuments(query);

  const companies = await Company.find(query)
    .skip((page - 1) * size)
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
}

export async function updateCompanyController(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const company_id = formData.get("company_id")?.toString();
    if (!company_id || !Types.ObjectId.isValid(company_id)) {
      return NextResponse.json({ message: "Invalid company ID" }, { status: 400 });
    }

    const logo = formData.get("logo") as File | null;
    const password = formData.get("password")?.toString();
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    let uploadedPath = undefined;
    if (logo) {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${logo.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);
      await fs.writeFile(filePath, buffer);
      uploadedPath = `/uploads/${fileName}`;
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