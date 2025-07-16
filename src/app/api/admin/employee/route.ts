import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/utils/middleware/roleGuard";
import { connectDB } from "@/lib/mongoose";
import { Employee } from "@/models/Employee";
import { createUserSchema } from "@/utils/validation/userSchema";
import { uploadFileToS3 } from "@/utils/upload/s3Uploader";
import { checkCompanyExists } from "@/helper/CheckValidity";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

// POST - Create Employee
export async function POST(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  await connectDB();

  try {
    const formData = await req.formData();
    const companyId = formData.get("company_id")?.toString();

    if (companyId) {
      const companyCheck = await checkCompanyExists(companyId);
      if (!companyCheck.success) {
        return NextResponse.json({
          success: false,
          error: "Invalid or non-existing company_id",
        }, { status: 400 });
      }
    }

    const logo = formData.get("logo") as File | null;
    let uploadedPath = "";

    const bodyObject: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
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
      return NextResponse.json({
        success: false,
        error: parsed.error.format(),
      }, { status: 400 });
    }

    if (logo) {
      uploadedPath = await uploadFileToS3(logo);
    }

    const body = parsed.data;

    const existingEmployee = await Employee.findOne({ email: body.email });
    if (existingEmployee) {
      return NextResponse.json({
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
      }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newEmployee = await Employee.create({
      ...body,
      password: hashedPassword,
      photo_url: uploadedPath || "",
    });

    return NextResponse.json({
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
    }, { status: 200 });
  } catch (err) {
    console.error("❌ Unexpected error in POST /employee:", err);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

// GET - List Employees & Get By ID
export async function GET(req: NextRequest): Promise<NextResponse> {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  await connectDB();

  const { searchParams } = req.nextUrl;
  const employeeId = searchParams.get("employee_id");

  if (employeeId) {
    if (!Types.ObjectId.isValid(employeeId)) {
      return NextResponse.json(
        { success: false, message: "Invalid employee_id" },
        { status: 400 }
      );
    }

    try {
      const employee = await Employee.findById(employeeId).select(
        "first_name last_name email phone address city route"
      );

      if (!employee) {
        return NextResponse.json(
          { success: false, message: "Employee not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          id: employee._id,
          name: `${employee.first_name} ${employee.last_name}`,
          email: employee.email,
          phone: employee.phone,
          address: employee.address,
          city: employee.city,
          route: employee.route || "",
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching employee by ID:", error);
      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  const page = parseInt(searchParams.get("page") || "1", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);
  const q = searchParams.get("q") || "";

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

  try {
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

    return NextResponse.json(
      {
        data: formatted,
        page,
        size,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT - Update Employee
export async function PUT(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  await connectDB();

  try {
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
      uploadedPath = await uploadFileToS3(logo);
      if (uploadedPath) {
        updateData.photo_url = uploadedPath;
      }
    }

    const updated = await Employee.findByIdAndUpdate(employee_id, updateData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: updated._id,
      photo_url: updated.photo_url || uploadedPath,
      name: `${updated.first_name} ${updated.last_name}`,
      email: updated.email,
      phone: updated.phone,
      address: updated.address,
      city: updated.city,
      route: updated.route || null,
    });
  } catch (error) {
    console.error("❌ Error updating employee:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
