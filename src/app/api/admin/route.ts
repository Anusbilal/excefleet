import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Admin } from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: "Admin already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
    });

    return NextResponse.json({
      message: "Admin created successfully",
      data: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Admin creation error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
