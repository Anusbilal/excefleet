import { Company } from "@/models/Company";
import { Employee } from "@/models/Employee";
import { Driver } from "@/models/Driver"
import { connectDB } from "@/lib/mongoose";
import { Types } from "mongoose";


export async function checkEmployeeExists(employee_id: string) {
  await connectDB();

  if (!Types.ObjectId.isValid(employee_id)) {
    return {
      success: false,
      message: "Invalid employee_id",
    };
  }

  const employee = await Employee.findById(employee_id);
  if (!employee) {
    return {
      success: false,
      message: "Employee not found",
    };
  }

  return {
    success: true,
    employee,
  };
}


export async function checkCompanyExists(company_id: string) {
  await connectDB();

  if (!Types.ObjectId.isValid(company_id)) {
    return {
      success: false,
      message: "Invalid company_id",
    };
  }

  const company = await Company.findById(company_id);
  if (!company) {
    return {
      success: false,
      message: "Company not found",
    };
  }

  return {
    success: true,
    company,
  };
}


export async function checkDriverExists(driver_id: string) {
  await connectDB();

  if (!Types.ObjectId.isValid(driver_id)) {
    return {
      success: false,
      message: "Invalid driver_id",
    };
  }

  const driver = await Driver.findById(driver_id);
  if (!driver) {
    return {
      success: false,
      message: "Driver not found",
    };
  }

  return {
    success: true,
    driver,
  };
}
