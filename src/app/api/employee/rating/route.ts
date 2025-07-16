import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/middleware/auth";
import { connectDB } from "@/lib/mongoose";
import { Rating } from "@/models/Rating";
import { Employee } from "@/models/Employee";
import { createRatingSchema } from "@/utils/validation/ratingSchema";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const auth = await verifyToken(req);
  if (auth instanceof NextResponse) return auth;

  await connectDB();

  try {
    const body = await req.json();

    const parsed = createRatingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.format() }, { status: 400 });
    }

    const { rating, created_by, driver_id, feedback } = parsed.data;

    const createdById = new mongoose.Types.ObjectId(created_by);
    const driverId = new mongoose.Types.ObjectId(driver_id);

    const creator = await Employee.findById(createdById);
    if (!creator) {
      return NextResponse.json({ success: false, error: { message: "Invalid creator" } }, { status: 400 });
    }

    const newRating = await Rating.create({
      rating,
      created_by: createdById,
      driver_id: driverId,
      feedback,
    });

    return NextResponse.json({
        rating: newRating.rating,
        created_by: newRating.created_by,
        driver_id: newRating.driver_id,
        timestamp: newRating.createdAt,
    });
  } catch (error) {
    console.error("Rating creation error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
