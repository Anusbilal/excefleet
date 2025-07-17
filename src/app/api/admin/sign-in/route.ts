import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/models/Admin";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/middleware/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const token = await generateToken({ id: admin._id, role: admin.role });

    return NextResponse.json(
      { message: "Signed in successfully.", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin sign-in error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
