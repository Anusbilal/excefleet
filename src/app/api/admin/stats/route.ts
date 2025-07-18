import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Company } from "@/models/Company";
import { Employee } from "@/models/Employee";
import { Driver } from "@/models/Driver";

export async function GET(req: NextRequest) {
    try {
        const [totalCompanies, totalEmployees, totalDrivers] = await Promise.all([
            Company.countDocuments(),
            Employee.countDocuments(),
            Driver.countDocuments()
        ]);

        return NextResponse.json({
            total_companies: totalCompanies.toString(),
            total_employees: totalEmployees.toString(),
            total_drivers: totalDrivers.toString()
        });
    } catch (error) {
        console.error("Failed to fetch stats:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
