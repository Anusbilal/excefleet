import { NextRequest, NextResponse } from "next/server";
import { createRating } from "@/lib/controllers/employee/rating.controller";
import { verifyToken } from "@/utils/middleware/auth";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: NextRequest) {
    const auth = await verifyToken(req);
    if (auth instanceof NextResponse) return auth;
    await connectDB();
    const body = await req.json();
    const result = await createRating(body);

    return NextResponse.json(result, {
        status: result.success ? 200 : 400,
    });
}
