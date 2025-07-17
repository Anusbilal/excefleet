import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { verifyOtpSchema } from "@/utils/validation/authSchema";
import { Otp } from "@/models/Otp";
import * as jose from 'jose';
import { Employee } from "@/models/Employee";
import { connectDB } from "@/lib/mongoose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = verifyOtpSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
        }
        const { email, otp } = parsed.data;
        const otpRecord = await Otp.findOne({ email, otp });
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
        }
        await Otp.deleteMany({ email });
        await connectDB();
        const employee = await Employee.findOne({ login_email:email });
        const token = await new jose.SignJWT(
            { userId: employee._id, role: "employee", email: employee.email }
        )
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(JWT_SECRET);

        return NextResponse.json({
            message: "OTP verified successfully",
            token,
        });
    } catch (error) {
        console.error("OTP verify error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
