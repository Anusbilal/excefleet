import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Driver } from "@/models/Driver";
import { checkCompanyExists } from "@/helper/CheckValidity";
import { uploadFileToS3 } from "@/utils/upload/s3Uploader";
import { isValidObjectId, Types } from "mongoose";
import bcrypt from "bcryptjs";

async function saveFile(file: File): Promise<string> {
  if (!file || file.size === 0) {
    return "";
  }
  const uploadedPath = await uploadFileToS3(file);
  return uploadedPath;
}

// POST: Create a new driver
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const photo = formData.get("photo") as File | null;
    const cnic_image = formData.get("cnic_image") as File | null;
    const license_image = formData.get("license_image") as File | null;

    const pin = formData.get("pin")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (!/^\d{5}$/.test(pin)) {
      return NextResponse.json({ success: false, error: "PIN must be exactly 5 digits" }, { status: 400 });
    }

    const companyId = formData.get("company_id")?.toString();
    if (companyId) {
      const companyCheck = await checkCompanyExists(companyId);
      if (!companyCheck.success) {
        return NextResponse.json({ success: false, error: "Invalid or non-existing company_id" }, { status: 400 });
      }
    }

    const existingDriver = await Driver.findOne({
      $or: [
        { phone: formData.get("phone") },
        { login_phone: formData.get("login_phone") },
        ...(formData.get("email") ? [{ email: formData.get("email") }] : []),
      ],
    });

    if (existingDriver) {
      return NextResponse.json({
        success: false,
        error: "Driver with the same phone, login phone, or email already exists",
      }, { status: 400 });
    }

    const [photo_url, cnic_image_url, license_image_url] = await Promise.all([
      photo ? saveFile(photo) : "",
      cnic_image ? saveFile(cnic_image) : "",
      license_image ? saveFile(license_image) : "",
    ]);

    const hashedPin = await bcrypt.hash(pin, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = await Driver.create({
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email")?.toString() || null,
      phone: formData.get("phone"),
      login_phone: formData.get("login_phone"),
      contractor: formData.get("contractor"),
      address: formData.get("address"),
      province: formData.get("province"),
      city: formData.get("city"),
      location: {
        lat: parseFloat(formData.get("location.lat")?.toString() || "0"),
        lng: parseFloat(formData.get("location.lng")?.toString() || "0"),
      },
      password: hashedPassword,
      pin: hashedPin,
      photo_url,
      cnic_image_url,
      license_image_url,
      company_id: companyId ? new Types.ObjectId(companyId) : undefined,
      route_id: formData.get("route_id") ? new Types.ObjectId(formData.get("route_id")!.toString()) : undefined,
      status: "Active",
      rating: null,
    });

    return NextResponse.json({
      message: "Driver created successfully",
      data: {
        name: `${newDriver.first_name} ${newDriver.last_name}`,
        email: newDriver.email || null,
        phone: newDriver.phone,
        city: newDriver.city,
        status: newDriver.status,
        rating: newDriver.rating,
      },
    });
  } catch (error) {
    console.error("Driver creation failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET: List all drivers
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      if (!isValidObjectId(id)) {
        return NextResponse.json(
          { success: false, message: "Invalid driver ID" },
          { status: 400 }
        );
      }

      const driver = await Driver.findById(id);
      if (!driver) {
        return NextResponse.json(
          { success: false, message: "Driver not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        name: `${driver.first_name} ${driver.last_name}`,
        email: driver.email || null,
        phone: driver.phone,
        city: driver.city,
        status: driver.status,
        rating: driver.rating ?? null,
      });
    }

    const page = parseInt(searchParams.get("page") || "1", 10);
    const size = parseInt(searchParams.get("size") || "10", 10);
    const q = searchParams.get("q") || "";

    const skip = (page - 1) * size;
    const query: any = {};

    if (q) {
      query.$or = [
        { first_name: { $regex: q, $options: "i" } },
        { last_name: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ];
    }

    const drivers = await Driver.find(query)
      .skip(skip)
      .limit(size)
      .sort({ createdAt: -1 });

    const formatted = drivers.map((driver) => ({
      name: `${driver.first_name} ${driver.last_name}`,
      email: driver.email || null,
      phone: driver.phone,
      city: driver.city,
      status: driver.status,
      rating: driver.rating ?? null,
    }));

    return NextResponse.json(
      {
        data: formatted,
        pagination: {
          page,
          size,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching driver(s):", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// PUT: Update a driver
export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get("id")?.toString();

  if (!id || !isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid driver ID" }, { status: 400 });
  }

  const pin = formData.get("pin")?.toString();
  if (pin && !/^\d{5}$/.test(pin)) {
    return NextResponse.json({ success: false, message: "PIN must be a 5-digit number" }, { status: 400 });
  }

  const driver = await Driver.findById(id);
  if (!driver) {
    return NextResponse.json({ success: false, message: "Driver not found" }, { status: 404 });
  }

  const updateData: any = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email") || null,
    phone: formData.get("phone"),
    login_phone: formData.get("login_phone"),
    contractor: formData.get("contractor"),
    address: formData.get("address"),
    province: formData.get("province"),
    city: formData.get("city"),
    location: {
      lat: parseFloat(formData.get("location.lat")?.toString() || "0"),
      lng: parseFloat(formData.get("location.lng")?.toString() || "0"),
    },
  };

  if (formData.get("company_id")) {
    updateData.company_id = new Types.ObjectId(formData.get("company_id")!.toString());
  }

  if (formData.get("password")) {
    updateData.password = await bcrypt.hash(formData.get("password")!.toString(), 10);
  }

  if (pin) {
    updateData.pin = await bcrypt.hash(pin, 10);
  }

  const photo = formData.get("photo") as File | null;
  const cnic_image = formData.get("cnic_image") as File | null;
  const license_image = formData.get("license_image") as File | null;

  if (photo) updateData.photo_url = await saveFile(photo);
  if (cnic_image) updateData.cnic_image_url = await saveFile(cnic_image);
  if (license_image) updateData.license_image_url = await saveFile(license_image);

  const updated = await Driver.findByIdAndUpdate(id, updateData, { new: true });
  
  return NextResponse.json({
      name: `${updated.first_name} ${updated.last_name}`,
      email: updated.email || null,
      phone: updated.phone,
      city: updated.city,
      status: updated.status,
      rating: updated.rating ?? null,
  });
}
