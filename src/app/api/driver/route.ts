import { NextRequest, NextResponse } from "next/server";
import { createDriverWithOptionalImage } from "@/lib/controllers/driver/driver.controller";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("profile_picture") as File | null;
        console.log(formData);
        await connectDB();
        const payload = {
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
            email: formData.get("email") as string,
            mobile_number: formData.get("mobile_number") as string,
            company_id: formData.get("company_id") as string,
            address: formData.get("address") as string,
            city: formData.get("city") as string,
            state: formData.get("state") as string,
            latitude: formData.get("latitude") as string,
            longitude: formData.get("longitude") as string,
            password: formData.get("password") as string,
            pin: formData.get("pin") as string | null,
            file: file ?? null,
        };

        const result = await createDriverWithOptionalImage(payload);

        return NextResponse.json(result, {
            status: result.success ? 200 : 400
        });
    } catch (error) {
        console.error("Driver creation failed:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
