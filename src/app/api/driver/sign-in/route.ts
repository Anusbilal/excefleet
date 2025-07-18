import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { signInSchema } from "@/utils/validation/authSchema";
import { Driver } from "@/models/Driver";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signInSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }
    const { phone } = parsed.data;
    const driver = await Driver.findOne({ login_phone: phone });
    
    if (!driver) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    return NextResponse.json({ message: "Phone Number is Valid" });
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
