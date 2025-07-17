import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { signInSchema } from "@/utils/validation/authSchema";
import { Driver } from "@/models/Driver";
import * as jose from 'jose';
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signInSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const { phone, pin } = parsed.data;
    const driver = await Driver.findOne({ login_phone: phone });
    if (!driver) {
      return NextResponse.json({ error: "Invalid phone number or pin" }, { status: 401 });
    }

    if (!driver.pin) {
      return NextResponse.json({ error: "Invalid phone number or pin" }, { status: 401 });
    }

    const isPinValid = await bcrypt.compare(pin as string, driver.pin as string);


    if (!isPinValid) {
      return NextResponse.json({ error: "Invalid phone number or pin" }, { status: 401 });
    }

    const token = await new jose.SignJWT({
        userId: driver._id,
        role: "driver",
        phone: driver.login_phone,
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

    return NextResponse.json({
      message: "PIN verified successfully",
      token,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
