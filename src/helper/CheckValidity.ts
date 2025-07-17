import { Company } from "@/models/Company";
import { Employee } from "@/models/Employee";
import { Driver } from "@/models/Driver";
import { isValidObjectId, Model } from "mongoose";

interface CheckResult {
  success: boolean;
  message?: string;
  data?: any;
}

/**
 * Generic function to check if a document exists by ID
 */
async function checkDocumentExists(model: Model<any>, id: string, entityName: string): Promise<CheckResult> {
  if (!isValidObjectId(id)) {
    return {
      success: false,
      message: `Invalid ${entityName}_id`,
    };
  }

  const document = await model.findById(id);
  if (!document) {
    return {
      success: false,
      message: `${entityName} not found`,
    };
  }

  return {
    success: true,
    data: document,
  };
}

/**
 * Specific wrappers for each model (optional, for clarity)
 */
export async function checkEmployeeExists(employee_id: string) {
  const result = await checkDocumentExists(Employee, employee_id, "employee");
  if (result.success) {
    return { success: true, employee: result.data };
  }
  return result;
}

export async function checkCompanyExists(company_id: string) {
  const result = await checkDocumentExists(Company, company_id, "company");
  if (result.success) {
    return { success: true, company: result.data };
  }
  return result;
}

export async function checkDriverExists(driver_id: string) {
  const result = await checkDocumentExists(Driver, driver_id, "driver");
  if (result.success) {
    return { success: true, driver: result.data };
  }
  return result;
}
