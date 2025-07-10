import { connectDB } from "@/lib/mongoose";
import { Employee } from "@/models/Employee";
import { createUserSchema } from "@/utils/validation/userSchema";
import bcrypt from "bcryptjs";

export async function createEmployee(data: unknown) {
  const parsed = createUserSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.format(),
    };
  }

  const body = parsed.data;

  const existingEmployee = await Employee.findOne({ email: body.email });
  if (existingEmployee) {
    return {
      message: "Employee already exists",
      data: {
        name: existingEmployee.name,
        email: existingEmployee.email,
        mobile_number: existingEmployee.mobile_number,
        city: existingEmployee.city,
        address: existingEmployee.address,
        route: existingEmployee.route,
        latitude: existingEmployee.latitude,
        longitude: existingEmployee.longitude,
      },
    };
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const employee = await Employee.create({
    ...body,
    password: hashedPassword,
  });

  return {
    success: true,
    data: {
      name: employee.name,
      email: employee.email,
      mobile_number: employee.mobile_number,
      city: employee.city,
      address: employee.address,
      route: employee.route,
      latitude: employee.latitude,
      longitude: employee.longitude,
    },
  };
}

export async function getAllEmployees() {
  const employees = await Employee.find().select("-password");
  return {
    data: employees,
  };
}
