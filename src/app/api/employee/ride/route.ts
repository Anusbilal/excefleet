import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/middleware/auth";
import { connectDB } from "@/lib/mongoose";
import { Ride } from "@/models/Ride";
import { Employee } from "@/models/Employee";
import { createRideSchema } from "@/utils/validation/rideSchema";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const auth = await verifyToken(req);
  if (auth instanceof NextResponse) return auth;

  await connectDB();

  try {
    const body = await req.json();

    const parsed = createRideSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.format() }, { status: 400 });
    }

    const { ride, user_id, company_id } = parsed.data;

    const userObjectId = new mongoose.Types.ObjectId(user_id);
    const companyObjectId = new mongoose.Types.ObjectId(company_id);

    const employee = await Employee.findOne({
      _id: userObjectId,
      company_id: companyObjectId,
    });

    if (!employee) {
      return NextResponse.json({
        success: false,
        error: { message: "Employee not found or doesn't belong to the specified company" },
      }, { status: 404 });
    }

    const newRide = await Ride.create({
      ride,
      user_id: userObjectId,
      company_id: companyObjectId,
    });

    return NextResponse.json({
      data: newRide,
    });
  } catch (error) {
    console.error("Ride creation error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
