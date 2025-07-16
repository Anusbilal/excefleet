import { requireRole } from "@/utils/middleware/roleGuard";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { RouteModel } from "@/models/Route";
import { Vehicle } from "@/models/Vehicle";
import { Driver } from "@/models/Driver";
import { Employee } from "@/models/Employee";
import mongoose, { Types } from "mongoose";
import { isValidObjectId } from "mongoose";

type PopulatedRoute = {
  _id: string;
  name: string;
  city: string;
  from: string;
  to: string;
  kilometers: number;
  driver_id?: {
    _id: string;
    first_name: string;
    last_name: string;
    phone: string;
  } | null;
};


export async function POST(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "super_admin"]);
  if (auth instanceof NextResponse) return auth;

  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      routes,
      city,
      from,
      to,
      kilometers,
      driver_id,
    } = body;

    if (!Types.ObjectId.isValid(driver_id)) {
      return NextResponse.json({ message: "Invalid driver_id." }, { status: 400 });
    }

    const driver = await Driver.findById(driver_id);
    if (!driver) {
      return NextResponse.json({ message: "Driver not found." }, { status: 404 });
    }

    for (const route of routes) {
      const { employee_id } = route;
      if (!Types.ObjectId.isValid(employee_id)) {
        return NextResponse.json(
          { message: `Invalid employee_id: ${employee_id}` },
          { status: 400 }
        );
      }

      const employeeExists = await Employee.findById(employee_id);
      if (!employeeExists) {
        return NextResponse.json(
          { message: `Employee not found: ${employee_id}` },
          { status: 404 }
        );
      }
    }

    const newRoute = await RouteModel.create({
      name,
      routes,
      city,
      from,
      to,
      kilometers,
      driver_id,
    });

    const vehicle = await Vehicle.findOne({ driver_id });

    return NextResponse.json({
      id: newRoute._id,
      name: newRoute.name,
      city: newRoute.city,
      from: newRoute.from,
      to: newRoute.to,
      kilometers: newRoute.kilometers,
      driver_name: `${driver.first_name} ${driver.last_name}`,
      driver_phone: driver.phone,
      vehicle_number: vehicle?.registration_number || "",
    });
  } catch (error) {
    console.error("Route creation failed:", error);
    return NextResponse.json({ message: "Failed to create route." }, { status: 500 });
  }
}


export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const route_id = searchParams.get("route_id");

    if (route_id) {
      if (!isValidObjectId(route_id)) {
        return NextResponse.json(
          { error: "Invalid route_id" },
          { status: 400 }
        );
      }

      const route = await RouteModel.findById(route_id)
        .populate("driver_id", "first_name last_name phone")
        .lean();

      if (!route) {
        return NextResponse.json(
          { error: "Route not found" },
          { status: 404 }
        );
      }

      if (!route) {
        return NextResponse.json({ error: "Route not found" }, { status: 404 });
      }

      const vehicle = await Vehicle.findOne({
        driver_id: (route as any).driver_id?._id,
      }).lean();

      return NextResponse.json(
        {
          id: (Array.isArray(route) ? undefined : route._id),
          name: (Array.isArray(route) ? undefined : route.name),
          city: (Array.isArray(route) ? undefined : route.city),
          from: (Array.isArray(route) ? undefined : route.from),
          to: (Array.isArray(route) ? undefined : route.to),
          kilometers: (Array.isArray(route) ? undefined : route.kilometers),
          driver_name: !Array.isArray(route) && route.driver_id
            ? `${route.driver_id.first_name} ${route.driver_id.last_name}`
            : null,
          driver_phone: !Array.isArray(route) ? route.driver_id?.phone ?? null : null,
          vehicle_number: !Array.isArray(route)
            ? (vehicle && !Array.isArray(vehicle) ? (vehicle as any).registration_number ?? null : null)
            : null,
        },
        { status: 200 }
      );

    } else {

      const routes = await RouteModel.find()
        .populate("driver_id", "first_name last_name phone")
        .lean();

      const driverIds = routes
        .map((route) => route.driver_id?._id.toString())
        .filter(Boolean);
      const uniqueDriverIds = Array.from(new Set(driverIds));

      const vehicles = await Vehicle.find({
        driver_id: { $in: uniqueDriverIds },
      }).lean();

      const vehicleMap = vehicles.reduce((acc, vehicle) => {
        if (vehicle.driver_id) {
          acc[vehicle.driver_id.toString()] = vehicle.registration_number;
        }
        return acc;
      }, {} as Record<string, string>);

      const response = routes.map((route: any) => ({
        id: route._id,
        name: route.name,
        city: route.city,
        from: route.from,
        to: route.to,
        kilometers: route.kilometers,
        driver_name: route.driver_id
          ? `${route.driver_id.first_name} ${route.driver_id.last_name}`
          : null,
        driver_phone: route.driver_id?.phone ?? null,
        vehicle_number:
          route.driver_id && vehicleMap[route.driver_id._id.toString()]
            ? vehicleMap[route.driver_id._id.toString()]
            : null,
      }));

      return NextResponse.json(response, { status: 200 });
    }
  } catch (error) {
    console.error("Failed to fetch route(s):", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const route_id = searchParams.get('route_id');
    if (!route_id) {
      return NextResponse.json({ success: false, message: "route_id is required" }, { status: 400 });
    }
    const body = await req.json();
    const {
      name,
      routes,
      city,
      from,
      to,
      kilometers,
      driver_id
    } = body;

    if (
      !name ||
      !Array.isArray(routes) ||
      !city ||
      !from ||
      !to ||
      !kilometers ||
      !driver_id
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedRoute = await RouteModel.findByIdAndUpdate(
      route_id,
      {
        name,
        routes,
        city,
        from,
        to,
        kilometers,
        driver_id: new mongoose.Types.ObjectId(driver_id),
      },
      { new: true }
    ).lean();

    if (!updatedRoute) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    }

    if (Array.isArray(updatedRoute)) {
      return NextResponse.json({ error: "Unexpected array result" }, { status: 500 });
    }

    return NextResponse.json({
      id: (updatedRoute as any)._id,
      name: updatedRoute.name,
      routes: updatedRoute.routes,
      city: updatedRoute.city,
      from: updatedRoute.from,
      to: updatedRoute.to,
      kilometers: updatedRoute.kilometers,
      driver_id: updatedRoute.driver_id,
    });

  } catch (error) {
    console.error("Update route error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}