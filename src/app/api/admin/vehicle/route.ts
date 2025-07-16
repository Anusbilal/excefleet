import { requireRole } from "@/utils/middleware/roleGuard";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Vehicle } from "@/models/Vehicle";
import { checkDriverExists } from "@/helper/CheckValidity";
import { uploadFileToS3 } from "@/utils/upload/s3Uploader";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  try {
    await connectDB();

    const formData = await req.formData();
    const files = formData.getAll("images") as File[];
    const driverId = formData.get("driver_id")?.toString();

    if (!driverId) {
      return NextResponse.json(
        { success: false, message: "Driver ID is required." },
        { status: 400 }
      );
    }

    const driverExists = await checkDriverExists(driverId);
    if (!driverExists) {
      return NextResponse.json(
        { success: false, message: "Driver not found." },
        { status: 404 }
      );
    }

    const registrationNumber = formData.get("registration_number")?.toString();
    if (!registrationNumber) {
      return NextResponse.json(
        { success: false, message: "Registration number is required." },
        { status: 400 }
      );
    }

    const existingVehicle = await Vehicle.findOne({ registration_number: registrationNumber });
    if (existingVehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle with this registration number already exists." },
        { status: 409 }
      );
    }

    const uploadedPaths: string[] = [];
    for (const file of files) {
      const uploadedPath = await uploadFileToS3(file);
      uploadedPaths.push(uploadedPath);
    }

    const newVehicle = await Vehicle.create({
      image_urls: uploadedPaths,
      first_name: formData.get("first_name")?.toString(),
      last_name: formData.get("last_name")?.toString(),
      phone: formData.get("phone")?.toString(),
      type: formData.get("type")?.toString(),
      registration_city: formData.get("registration_city")?.toString(),
      registration_number: registrationNumber,
      address: formData.get("address")?.toString(),
      location: {
        lat: parseFloat(formData.get("lat")?.toString() || "0"),
        lng: parseFloat(formData.get("lng")?.toString() || "0"),
      },
      driver_id: driverId,
    });

    return NextResponse.json(
      {
        id: newVehicle._id,
        first_name: newVehicle.first_name,
        last_name: newVehicle.last_name,
        phone: newVehicle.phone,
        type: newVehicle.type,
        registration_city: newVehicle.registration_city,
        registration_number: newVehicle.registration_number,
        address: newVehicle.address,
        driver_name: `${newVehicle.first_name} ${newVehicle.last_name}`,
      }
    );
  } catch (err) {
    console.error("Vehicle creation failed:", err);
    return NextResponse.json(
      { success: false, message: "Failed to add vehicle." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const vehicleId = searchParams.get("vehicle_id");

  try {
    await connectDB();

    if (vehicleId) {
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
        return NextResponse.json(
          { success: false, message: "Vehicle not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        id: vehicle._id,
        image_urls: vehicle.image_urls,
        first_name: vehicle.first_name,
        last_name: vehicle.last_name,
        phone: vehicle.phone,
        type: vehicle.type,
        registration_city: vehicle.registration_city,
        registration_number: vehicle.registration_number,
        address: vehicle.address,
        location: vehicle.location,
        driver_id: vehicle.driver_id,
      });
    }

    const page = parseInt(searchParams.get("page") || "1", 10);
    const size = parseInt(searchParams.get("size") || "10", 10);
    const q = searchParams.get("q") || "";

    const filter = q
      ? { registration_number: { $regex: q, $options: "i" } }
      : {};

    const vehicles = await Vehicle.find(filter)
      .skip((page - 1) * size)
      .limit(size)
      .lean();

    const formattedVehicles = vehicles.map((vehicle) => ({
      id: vehicle._id,
      first_name: vehicle.first_name,
      last_name: vehicle.last_name,
      phone: vehicle.phone,
      type: vehicle.type,
      registration_city: vehicle.registration_city,
      registration_number: vehicle.registration_number,
      address: vehicle.address,
      driver_name: `${vehicle.first_name} ${vehicle.last_name}`,
    }));

    return NextResponse.json({
      data: formattedVehicles,
      page,
      size,
    });
  } catch (err) {
    console.error("Error fetching vehicle(s):", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch vehicle(s)." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;
  const { searchParams } = new URL(req.url);
  const vehicleId = searchParams.get('vehicle_id');
  if (!vehicleId) {
    return NextResponse.json(
      { success: false, message: "vehicle_id is required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const formData = await req.formData();

    const existingVehicle = await Vehicle.findById(vehicleId);
    if (!existingVehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found." },
        { status: 404 }
      );
    }

    const registration_number = formData.get("registration_number")?.toString();
    if (registration_number) {
      const duplicate = await Vehicle.findOne({
        registration_number,
        _id: { $ne: vehicleId },
      });
      if (duplicate) {
        return NextResponse.json(
          { success: false, message: "Duplicate registration number." },
          { status: 409 }
        );
      }
    }

    const driver_id = formData.get("driver_id")?.toString();
    if (driver_id) {
      const exists = await checkDriverExists(driver_id);
      if (!exists) {
        return NextResponse.json(
          { success: false, message: "Driver not found." },
          { status: 404 }
        );
      }
    }

    const files = formData.getAll("images") as File[];
    const uploadedPaths: string[] = [];

    for (const file of files) {
      const uploadedPath = await uploadFileToS3(file);
      uploadedPaths.push(uploadedPath);
    }

    const updated = await Vehicle.findByIdAndUpdate(
      vehicleId,
      {
        image_urls: uploadedPaths.length ? uploadedPaths : existingVehicle.image_urls,
        first_name: formData.get("first_name")?.toString(),
        last_name: formData.get("last_name")?.toString(),
        phone: formData.get("phone")?.toString(),
        type: formData.get("type")?.toString(),
        registration_city: formData.get("registration_city")?.toString(),
        registration_number,
        address: formData.get("address")?.toString(),
        location: {
          lat: parseFloat(formData.get("lat")?.toString() || "0"),
          lng: parseFloat(formData.get("lng")?.toString() || "0"),
        },
        driver_id,
      },
      { new: true }
    );
    
    return NextResponse.json({
      id: updated._id,
      first_name: updated.first_name,
      last_name: updated.last_name,
      phone: updated.phone,
      type: updated.type,
      registration_city: updated.registration_city,
      registration_number: updated.registration_number,
      address: updated.address,
      driver_name: `${updated.first_name} ${updated.last_name}`,
    });
  } catch (err) {
    console.error("Update vehicle error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update vehicle." },
      { status: 500 }
    );
  }
}