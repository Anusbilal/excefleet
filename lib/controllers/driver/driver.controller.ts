import { checkCompanyExists } from "../../repository/CheckValidity"
import { writeFile } from "fs/promises";
import path from "path";
import { Driver } from "@/models/Driver";
import { connectDB } from "@/lib/mongoose";
import { Types } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface DriverPayload {
    first_name: string;
    last_name: string;
    email?: string;
    phone: string;
    login_phone: string;
    contractor: string;
    address: string;
    province: string;
    city: string;
    location: {
        lat: number;
        lng: number;
    };
    password: string;
    pin: string;
    photo?: File | null;
    cnic_image?: File | null;
    license_image?: File | null;
    company_id?: string;
    route_id?: string;
}

async function saveFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    await writeFile(filePath, buffer);
    return `/uploads/${fileName}`;
}

export async function createDriverWithOptionalImage(data: DriverPayload) {
    try {
        if (data.company_id) {
            const companyCheck = await checkCompanyExists(data.company_id);
            if (!companyCheck.success) {
                return {
                    success: false,
                    error: "Invalid or non-existing company_id",
                };
            }
        }
        const existingDriver = await Driver.findOne({
            $or: [
                { phone: data.phone },
                { login_phone: data.login_phone },
                ...(data.email ? [{ email: data.email }] : []),
            ],
        });

        if (existingDriver) {
            return {
                success: false,
                error: "Driver with the same phone, login phone, or email already exists",
            };
        }
        const [photo_url, cnic_image_url, license_image_url] = await Promise.all([
            data.photo ? saveFile(data.photo) : "",
            data.cnic_image ? saveFile(data.cnic_image) : "",
            data.license_image ? saveFile(data.license_image) : "",
        ]);

        if (!/^\d{5}$/.test(data.pin)) {
            return {
                success: false,
                error: "PIN must be exactly 5 digits",
            };
        }
        const hashedPin = await bcrypt.hash(data.pin, 10);
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newDriver = await Driver.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            login_phone: data.login_phone,
            contractor: data.contractor,
            address: data.address,
            province: data.province,
            city: data.city,
            location: {
                lat: data.location.lat,
                lng: data.location.lng,
            },
            password: hashedPassword,
            pin: hashedPin,
            photo_url,
            cnic_image_url,
            license_image_url,
            company_id: data.company_id ? new mongoose.Types.ObjectId(data.company_id) : undefined,
            route_id: data.route_id ? new mongoose.Types.ObjectId(data.route_id) : undefined,
            status: "Active",
            rating: null,
        });

        return {
            success: true,
            message: "Driver created successfully",
            data: {
                name: `${newDriver.first_name} ${newDriver.last_name}`,
                email: newDriver.email || null,
                phone: newDriver.phone,
                city: newDriver.city,
                status: newDriver.status,
                rating: newDriver.rating,
            },
        };
    } catch (error) {
        console.error("Error in createDriverWithOptionalImage:", error);
        return {
            success: false,
            error: "Failed to create driver",
        };
    }
}

export async function getAllDrivers({ page = 1, size = 10, q = "" }) {
  await connectDB();

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

  return {
    success: true,
    data: formatted,
  };
}


export async function getDriverById(id: string) {
  await connectDB();

  if (!Types.ObjectId.isValid(id)) {
    return {
      success: false,
      message: "Invalid driver ID",
    };
  }

  const driver = await Driver.findById(id);

  if (!driver) {
    return {
      success: false,
      message: "Driver not found",
    };
  }

  return {
    success: true,
    data: {
      name: `${driver.first_name} ${driver.last_name}`,
      email: driver.email || null,
      phone: driver.phone,
      city: driver.city,
      status: driver.status,
      rating: driver.rating ?? null,
    },
  };
}


export async function updateDriverById(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id || !Types.ObjectId.isValid(id)) {
    return { success: false, message: "Invalid driver ID" };
  }

  const pin = formData.get("pin")?.toString();
  if (pin && !/^\d{5}$/.test(pin)) {
    return { success: false, message: "PIN must be a 5-digit number" };
  }

  const driver = await Driver.findById(id);
  if (!driver) {
    return { success: false, message: "Driver not found" };
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

  return {
    success: true,
    data: {
      name: `${updated.first_name} ${updated.last_name}`,
      email: updated.email || null,
      phone: updated.phone,
      city: updated.city,
      status: updated.status,
      rating: updated.rating ?? null,
    },
  };
}