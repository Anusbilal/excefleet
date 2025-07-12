import { z } from "zod";

export const createUserSchema = z.object({
  company_id: z.string().min(1, "Company ID is required"),
  department: z.string().min(1, "Department is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  login_email: z.string().email("Invalid login email"),
  phone: z.string().min(6, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),

  route: z.string().optional(),
  photo_url: z.string().optional(), 
  latitude: z.union([z.string(), z.number()]).optional(),
  longitude: z.union([z.string(), z.number()]).optional(),

  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});
