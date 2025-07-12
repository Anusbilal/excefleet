import { NextRequest, NextResponse } from "next/server";
import { createDriverWithOptionalImage, getAllDrivers,updateDriverById } from "@/lib/controllers/driver/driver.controller";
import { requireRole } from "@/utils/middleware/roleGuard";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: NextRequest) {
  try {
    const auth = await requireRole(req, ["admin", "super_admin"]);
    if (auth instanceof NextResponse) return auth;
    await connectDB();
    const formData = await req.formData();

    const photo = formData.get("photo") as File | null;
    const cnic_image = formData.get("cnic_image") as File | null;
    const license_image = formData.get("license_image") as File | null;

    const payload = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email")?.toString(),
      phone: formData.get("phone") as string,
      login_phone: formData.get("login_phone") as string,
      contractor: formData.get("contractor") as string,
      address: formData.get("address") as string,
      province: formData.get("province") as string,
      city: formData.get("city") as string,
      location: {
        lat: parseFloat(formData.get("location.lat") as string),
        lng: parseFloat(formData.get("location.lng") as string),
      },
      password: formData.get("password") as string,
      pin: formData.get("pin") as string,
      photo,
      cnic_image,
      license_image,
      company_id: formData.get("company_id")?.toString(),
      route_id: formData.get("route_id")?.toString(),
    };

    const result = await createDriverWithOptionalImage(payload);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (error) {
    console.error("Driver creation failed:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const q = searchParams.get("q") || "";

  const result = await getAllDrivers({ page, size, q });

  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}


export async function PUT(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  await connectDB();
  const formData = await req.formData();
  const result = await updateDriverById(formData);

  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}