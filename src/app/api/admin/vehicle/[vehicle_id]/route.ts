import { updateVehicleController,getVehicleByIdController } from "@/lib/controllers/admin/vehicle.controller";
import { requireRole } from "@/utils/middleware/roleGuard";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { vehicle_id: string } }) {
    const auth = await requireRole(req, ["admin", "super_admin"]);
    if (auth instanceof NextResponse) return auth;

    const vehicleId = params.vehicle_id;

    if (!vehicleId) {
        return NextResponse.json({ success: false, message: "vehicle_id is required" }, { status: 400 });
    }

    return await updateVehicleController(req, vehicleId);
}

export async function GET(req: NextRequest, { params }: { params: { vehicle_id: string } }) {
    const auth = await requireRole(req, ["admin", "super_admin"]);
    if (auth instanceof NextResponse) return auth;
    
    const vehicleId = params.vehicle_id;

    if (!vehicleId) {
        return NextResponse.json({ success: false, message: "vehicle_id is required" }, { status: 400 });
    }

    return await getVehicleByIdController(req, vehicleId);
}