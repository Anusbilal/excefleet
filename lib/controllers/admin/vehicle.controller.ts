import { NextRequest, NextResponse } from "next/server";
import { Vehicle } from "@/models/Vehicle";
import { connectDB } from "@/lib/mongoose";
import { checkDriverExists } from "@/lib/repository/CheckValidity"
import path from "path";
import fs from "fs/promises";

export async function createVehicleController(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        const files = formData.getAll("images") as File[];
        const driverId = formData.get("driver_id")?.toString();
        if (!driverId) {
            return NextResponse.json({ message: "Driver ID is required." }, { status: 400 });
        }

        const driverExists = await checkDriverExists(driverId);
        if (!driverExists) {
            return NextResponse.json({ message: "Driver not found." }, { status: 404 });
        }

        const registrationNumber = formData.get("registration_number")?.toString();
        if (!registrationNumber) {
            return NextResponse.json({ message: "Registration number is required." }, { status: 400 });
        }

        const existingVehicle = await Vehicle.findOne({ registration_number: registrationNumber });
        if (existingVehicle) {
            return NextResponse.json({ message: "Vehicle with this registration number already exists." }, { status: 409 });
        }

        const uploadedPaths: string[] = [];
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path.join(process.cwd(), "public/uploads", fileName);
            await fs.writeFile(filePath, buffer);
            uploadedPaths.push(`/uploads/${fileName}`);
        }

        const newVehicle = await Vehicle.create({
            image_urls: uploadedPaths,
            first_name: formData.get("first_name")?.toString(),
            last_name: formData.get("last_name")?.toString(),
            phone: formData.get("phone")?.toString(),
            type: formData.get("type")?.toString(),
            registration_city: formData.get("registration_city")?.toString(),
            registration_number: formData.get("registration_number")?.toString(),
            address: formData.get("address")?.toString(),
            location: {
                lat: parseFloat(formData.get("lat")?.toString() || "0"),
                lng: parseFloat(formData.get("lng")?.toString() || "0"),
            },
            driver_id: formData.get("driver_id")?.toString(),
        });

        return NextResponse.json({
            id: newVehicle._id,
            first_name: newVehicle.first_name,
            last_name: newVehicle.last_name,
            phone: newVehicle.phone,
            type: newVehicle.type,
            registration_city: newVehicle.registration_city,
            registration_number: newVehicle.registration_number,
            address: newVehicle.address,
            driver_name: `${newVehicle.first_name} ${newVehicle.last_name}`,
        });
    } catch (err) {
        console.error("Vehicle creation failed:", err);
        return NextResponse.json({ message: "Failed to add vehicle." }, { status: 500 });
    }
}

export async function getVehiclesController(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const size = parseInt(searchParams.get("size") || "10");
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

        return NextResponse.json(formattedVehicles);
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return NextResponse.json({ message: "Failed to fetch vehicles" }, { status: 500 });
    }
}

export async function updateVehicleController(req: NextRequest, vehicleId: string) {
    try {
        await connectDB();

        const formData = await req.formData();

        if (!vehicleId) {
            return NextResponse.json({ message: "Vehicle ID is required." }, { status: 400 });
        }

        const existingVehicle = await Vehicle.findById(vehicleId);
        if (!existingVehicle) {
            return NextResponse.json({ message: "Vehicle not found." }, { status: 404 });
        }

        const registration_number = formData.get("registration_number")?.toString();
        if (registration_number) {
            const duplicate = await Vehicle.findOne({
                registration_number,
                _id: { $ne: vehicleId }
            });
            if (duplicate) {
                return NextResponse.json({ message: "Duplicate registration number." }, { status: 409 });
            }
        }

        const driver_id = formData.get("driver_id")?.toString();
        if (driver_id) {
            const exists = await checkDriverExists(driver_id);
            if (!exists) {
                return NextResponse.json({ message: "Driver not found." }, { status: 404 });
            }
        }

        const files = formData.getAll("images") as File[];
        const uploadedPaths: string[] = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path.join(process.cwd(), "public/uploads", fileName);
            await fs.writeFile(filePath, buffer);
            uploadedPaths.push(`/uploads/${fileName}`);
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
                driver_id
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
        return NextResponse.json({ message: "Failed to update vehicle." }, { status: 500 });
    }
}

export async function getVehicleByIdController(req: NextRequest, vehicleId: String) {
    try {
        await connectDB();

        if (!vehicleId) {
            return NextResponse.json(
                { message: "vehicle_id query param is required." },
                { status: 400 }
            );
        }

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return NextResponse.json({ message: "Vehicle not found." }, { status: 404 });
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
    } catch (err) {
        console.error("Get vehicle by ID failed:", err);
        return NextResponse.json({ message: "Failed to fetch vehicle." }, { status: 500 });
    }
}
