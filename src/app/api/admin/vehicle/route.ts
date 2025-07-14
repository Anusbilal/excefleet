import { createVehicleController, getVehiclesController } from "@/lib/controllers/admin/vehicle.controller";
import { requireRole } from "@/utils/middleware/roleGuard";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    const auth = await requireRole(req, ["admin", "super_admin"]);
    if (auth instanceof NextResponse) return auth;

    return await createVehicleController(req);
}

export async function GET(req: NextRequest) {
    const auth = await requireRole(req, ["admin", "super_admin"]);
    if (auth instanceof NextResponse) return auth;
    
    return await getVehiclesController(req);
}