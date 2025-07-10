import { Admin } from "@/models/Admin";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/middleware/auth";

interface SignInPayload {
  email: string;
  password: string;
}

export async function signInAdmin(data: SignInPayload) {
  const { email, password } = data;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return { message: "Invalid credentials" };
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return { message: "Invalid credentials" };
  }

  const token = generateToken({ id: admin._id, role: admin.role });

  return {
    message: "Signed in successfully.",
    token,
  };
}
