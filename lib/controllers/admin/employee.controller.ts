import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/mongoose";
import { Employee } from "@/models/Employee";
import { createUserSchema } from "@/utils/validation/userSchema";
import { checkCompanyExists } from "../../repository/CheckValidity"
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs/promises";

export async function createEmployee(data: FormData) {
  await connectDB();
  const companyId = data.get("company_id")?.toString();
  if (companyId) {
    const companyCheck = await checkCompanyExists(companyId);
    if (!companyCheck.success) {
      return {
        success: false,
        error: "Invalid or non-existing company_id",
      };
    }
  }
  const logo = data.get("logo") as File | null;
  let uploadedPath = "";

  const bodyObject: Record<string, any> = {};

  for (const [key, value] of data.entries()) {
    if (typeof value === "string") {
      if (key.startsWith("location.")) {
        const locKey = key.split(".")[1];
        if (!bodyObject.location) bodyObject.location = {};
        bodyObject.location[locKey] = parseFloat(value);
      } else {
        bodyObject[key] = value;
      }
    }
  }

  const parsed = createUserSchema.safeParse(bodyObject);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.format(),
    };
  }

  if (logo) {
    const bytes = await logo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${logo.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await fs.writeFile(filePath, buffer);
    uploadedPath = `/uploads/${fileName}`;
  }

  const body = parsed.data;

  const existingEmployee = await Employee.findOne({ email: body.email });
  if (existingEmployee) {
    return {
      success: false,
      message: "Employee already exists",
      data: {
        id: existingEmployee._id,
        name: `${existingEmployee.first_name} ${existingEmployee.last_name}`,
        email: existingEmployee.email,
        phone: existingEmployee.phone,
        address: existingEmployee.address,
        city: existingEmployee.city,
        route: existingEmployee.route || null,
      },
    };
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newEmployee = await Employee.create({
    ...body,
    password: hashedPassword,
    photo_url: uploadedPath || "",
  });

  return {
    success: true,
    message: "Employee created successfully",
    data: {
      id: newEmployee._id,
      name: `${newEmployee.first_name} ${newEmployee.last_name}`,
      email: newEmployee.email,
      phone: newEmployee.phone,
      address: newEmployee.address,
      city: newEmployee.city,
      route: newEmployee.route || null,
      photo_url: newEmployee.photo_url,
    },
  };
}

export async function getAllEmployees({
  page,
  size,
  q,
}: {
  page: number;
  size: number;
  q: string;
}) {
  const skip = (page - 1) * size;
  const regex = new RegExp(q, "i");

  const filter = q
    ? {
      $or: [
        { first_name: regex },
        { last_name: regex },
        { email: regex },
      ],
    }
    : {};

  const employees = await Employee.find(filter)
    .select("first_name last_name email phone address city route")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size);

  const formatted = employees.map((emp) => ({
    id: emp._id,
    name: `${emp.first_name} ${emp.last_name}`,
    email: emp.email,
    phone: emp.phone,
    address: emp.address,
    city: emp.city,
    route: emp.route || "",
  }));

  return {
    data: formatted,
    page,
    size,
  };
}

export async function getEmployeeById(employee_id: string) {
  const employee = await Employee.findById(employee_id).select(
    "first_name last_name email phone address city route"
  );

  if (!employee) {
    return null;
  }

  return {
    id: employee._id,
    name: `${employee.first_name} ${employee.last_name}`,
    email: employee.email,
    phone: employee.phone,
    address: employee.address,
    city: employee.city,
    route: employee.route || "",
  };
}


export async function updateEmployeeController(req: NextRequest) {
  await connectDB();

  const formData = await req.formData();
  const employee_id = formData.get("id")?.toString();

  if (!employee_id || !Types.ObjectId.isValid(employee_id)) {
    return NextResponse.json({ message: "Invalid employee ID" }, { status: 400 });
  }

  const logo = formData.get("logo") as File | null;
  let uploadedPath = "";

  const updateData: any = {
    company_id: formData.get("company_id")?.toString(),
    department: formData.get("department")?.toString(),
    first_name: formData.get("first_name")?.toString(),
    last_name: formData.get("last_name")?.toString(),
    email: formData.get("email")?.toString(),
    phone: formData.get("phone")?.toString(),
    address: formData.get("address")?.toString(),
    province: formData.get("province")?.toString(),
    city: formData.get("city")?.toString(),
    login_email: formData.get("login_email")?.toString(),
    route: formData.get("route")?.toString(),
    location: {
      lat: parseFloat(formData.get("location.lat")?.toString() || "0"),
      lng: parseFloat(formData.get("location.lng")?.toString() || "0"),
    },
  };

  const password = formData.get("password")?.toString();
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  if (logo) {
    const bytes = await logo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${logo.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await fs.writeFile(filePath, buffer);
    uploadedPath = `/uploads/${fileName}`;
    updateData.photo_url = uploadedPath;
  }

  const updated = await Employee.findByIdAndUpdate(employee_id, updateData, {
    new: true,
  });

  if (!updated) {
    return NextResponse.json({ message: "Employee not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: {
      id: updated._id,
      name: `${updated.first_name} ${updated.last_name}`,
      email: updated.email,
      phone: updated.phone,
      address: updated.address,
      city: updated.city,
      route: updated.route || null,
    },
  });
}