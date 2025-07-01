import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/User";
import { createUserSchema } from "@/utils/validation/userSchema";
import bcrypt from "bcryptjs";

export async function createUser(data: unknown) {
    const parsed = createUserSchema.safeParse(data);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.format(),
        };
    }
    const body = parsed.data;
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        return {
            success: false,
            error: { message: "User already exists" },
        };
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await User.create({
        ...body,
        password: hashedPassword,
    });

    return {
        success: true,
        data: user,
    };
}

export async function getAllEmployees() {
  const users = await User.find().select("-password");
  return {
    success: true,
    data: users,
  };
}
