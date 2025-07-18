import "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User"; 
import { isValidObjectId } from "mongoose";
import { uploadFileToS3 } from "@/utils/upload/s3Uploader";

async function saveFile(file: File): Promise<string> {
  const uploadedPath = await uploadFileToS3(file);
  return uploadedPath;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("photo") as File | null;
    const photo_url = file ? await saveFile(file) : "";

    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const lat = parseFloat(formData.get("location.lat") as string);
    const lng = parseFloat(formData.get("location.lng") as string);
    const role = formData.get("role") as "super_admin" | "admin" | "user" | "company";
    const login_email = formData.get("login_email") as string;
    const login_password = await bcrypt.hash(formData.get("login_password") as string, 10);
    const permissionRaw = formData.getAll("permission") as string[];
    const permission = Array.isArray(permissionRaw) ? permissionRaw : [];

    const exists = await User.findOne({ login_email });
    if (exists) {
      return NextResponse.json({
        success: false,
        message: "User with this login_email already exists",
      }, { status: 400 });
    }

    const newUser = await User.create({
      photo_url,
      first_name,
      last_name,
      email,
      phone,
      address,
      location: { lat, lng },
      role,
      login_email,
      login_password,
      permission,
    });

    return NextResponse.json({
      message: "User created successfully",
      data: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (user_id) {
      const user = await User.findById(user_id);
      if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        id: user._id,
        photo_url: user.photo_url || "",
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        location: {
          lat: user.location?.lat ?? 0,
          lng: user.location?.lng ?? 0,
        },
        role: user.role,
        login_email: user.login_email,
        permission: user.permission || [],
      });
    }

    const page = parseInt(searchParams.get("page") || "1", 10);
    const size = parseInt(searchParams.get("size") || "10", 10);
    const q = searchParams.get("q")?.toLowerCase() || "";

    const query: any = {};

    if (q) {
      query.$or = [
        { first_name: { $regex: q, $options: "i" } },
        { last_name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query, {
      first_name: 1,
      last_name: 1,
      email: 1,
      phone: 1,
      role: 1,
    })
      .skip((page - 1) * size)
      .limit(size);

    const response = users.map((user) => ({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    }));

    return NextResponse.json({
      data: response,
      pagination: {
        total,
        page,
        size,
        totalPages: Math.ceil(total / size),
      },
    });
  } catch (error) {
    console.error("Error fetching user(s):", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get('user_id');
        if (!user_id) {
            return NextResponse.json({ success: false, message: "user_id is required" }, { status: 400 });
        }
        const body = await req.json();

        const {
            photo_url,
            first_name,
            last_name,
            email,
            phone,
            address,
            location,
            role,
            login_email,
            login_password,
            permission,
        } = body;
        if (!user_id || !isValidObjectId(user_id)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }
        const user = await User.findById(user_id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        user.photo_url = photo_url;
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.phone = phone;
        user.address = address;
        user.location = location;
        user.role = role;
        user.login_email = login_email;
        user.permission = permission;

        if (login_password) {
            user.login_password = await bcrypt.hash(login_password, 10);
        }

        await user.save();

        return NextResponse.json(
            {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                photo_url: user.photo_url || "",
            }
        );
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

