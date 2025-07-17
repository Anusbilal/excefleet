import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { signInSchema } from "@/utils/validation/authSchema";
import { Employee } from "@/models/Employee";
import { Otp } from "@/models/Otp";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import { sendOtpEmail } from "@/lib/mailer";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signInSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const { email, password } = parsed.data;

    await connectDB();
    const employee = await Employee.findOne({ login_email: email });
    if (!employee) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password as string, employee.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({ email, otp, expiresAt });
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    await sendOtpEmail({ to: email as string, otp });
    return NextResponse.json({ message: "OTP has been sent to your email." });
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
