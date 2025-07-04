import { NextRequest, NextResponse } from "next/server";
import { signInSchema } from "@/utils/validation/authSchema";
import { Driver } from "@/models/Driver";
import { connectDB } from "@/lib/mongoose";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signInSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const { phone, pin } = parsed.data;

    await connectDB();

    const driver = await Driver.findOne({ mobile_number: phone });
    if (!driver) {
      return NextResponse.json({ error: "Invalid phone number or pin" }, { status: 401 });
    }

    if (!driver.pin || driver.pin !== pin) {
      return NextResponse.json({ error: "Invalid phone number or pin" }, { status: 401 });
    }

    const token = jwt.sign(
      {
        userId: driver._id,
        role: "driver", 
        phone: driver.mobile_number,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "PIN verified successfully",
      token,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
