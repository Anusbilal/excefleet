import { writeFile } from "fs/promises";
import path from "path";
import { Driver } from "@/models/Driver";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface DriverPayload {
    first_name: string;
    last_name: string;
    email?: string;
    mobile_number: string;
    company_id: string;
    address: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
    password: string;
    file: File | null;
    pin?: string | null;
}

export async function createDriverWithOptionalImage(data: DriverPayload) {
    try {
        let profile_picture = "";
        if (data.file) {
            const bytes = await data.file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${data.file.name}`;
            const filePath = path.join(process.cwd(), "public/uploads", fileName);

            await writeFile(filePath, buffer);
            profile_picture = `/uploads/${fileName}`;
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newDriver = await Driver.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            mobile_number: data.mobile_number,
            company_id: new mongoose.Types.ObjectId(data.company_id),
            address: data.address,
            city: data.city,
            state: data.state,
            latitude: data.latitude,
            longitude: data.longitude,
            password: hashedPassword,
            profile_picture,
            pin: data.pin,
        });

        const responseData = {
            first_name: newDriver.first_name,
            last_name: newDriver.last_name,
            email: newDriver.email,
            mobile_number: newDriver.mobile_number,
            company_id: newDriver.company_id,
            address: newDriver.address,
            city: newDriver.city,
            state: newDriver.state,
            latitude: newDriver.latitude,
            longitude: newDriver.longitude,
            profile_picture: newDriver.profile_picture,
        };

        return {
            success: true,
            message: "Driver created successfully",
            data: responseData,
        };
    } catch (error) {
        console.error("Error in createDriverWithOptionalImage:", error);
        return {
            success: false,
            error: "Failed to create driver",
        };
    }
}
